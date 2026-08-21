import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ContentItem = {
  id: string;
  section: string;
  title: string;
  src: string;
  type: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

const SECTIONS = [
  { value: "thumbnails", label: "Thumbnails" },
  { value: "workflow", label: "Automation" },
  { value: "extra", label: "Extra Videos" },
  { value: "presentations", label: "Presentations" },
];

const ITEM_TYPES = [
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
  { value: "pdf", label: "PDF" },
];

export const Route = createFileRoute("/admin/content")({
  head: () => ({
    meta: [{ title: "Manage Content — Admin" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminContentPage,
});

function AdminContentPage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);

  const [formData, setFormData] = useState({
    section: "thumbnails",
    title: "",
    src: "",
    type: "image",
    category: "",
    sort_order: 0,
    is_active: true,
  });

  useEffect(() => {
    checkAdminAccess();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchItems();
    }
  }, [isAdmin]);

  const checkAdminAccess = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Please sign in to access admin panel.");
        setCheckingAuth(false);
        return;
      }

      const { data, error: roleError } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });

      if (roleError || !data) {
        setError("Access denied. Admin privileges required.");
        setCheckingAuth(false);
        return;
      }

      setIsAdmin(true);
      setCheckingAuth(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(`Failed to verify admin access: ${errorMessage}`);
      setCheckingAuth(false);
    }
  };

  const fetchItems = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from("content_items")
        .select("*")
        .order("section", { ascending: true })
        .order("sort_order", { ascending: true });

      if (fetchError) {
        setError(`Failed to fetch content: ${fetchError.message}`);
        return;
      }

      setItems(data || []);
    } catch (err) {
      setError("Failed to fetch content items.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingItem) {
        const { error: updateError } = await supabase
          .from("content_items")
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingItem.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from("content_items").insert([formData]);

        if (insertError) throw insertError;
      }

      setFormData({
        section: "thumbnails",
        title: "",
        src: "",
        type: "image",
        category: "",
        sort_order: 0,
        is_active: true,
      });
      setEditingItem(null);
      fetchItems();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(`Failed to save content: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item: ContentItem) => {
    setEditingItem(item);
    setFormData({
      section: item.section,
      title: item.title,
      src: item.src,
      type: item.type,
      category: item.category || "",
      sort_order: item.sort_order,
      is_active: item.is_active,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const { error: deleteError } = await supabase.from("content_items").delete().eq("id", id);

      if (deleteError) throw deleteError;
      fetchItems();
    } catch (err) {
      setError("Failed to delete item.");
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setFormData({
      section: "thumbnails",
      title: "",
      src: "",
      type: "image",
      category: "",
      sort_order: 0,
      is_active: true,
    });
  };

  const getSectionLabel = (section: string) => {
    return SECTIONS.find((s) => s.value === section)?.label || section;
  };

  if (checkingAuth || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#1769E0] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#C7C7C3]">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-4">
        <div className="max-w-2xl w-full rounded-2xl border border-red-500/30 bg-[#181818] p-8">
          <h1 className="text-2xl font-bold text-white mb-4">Error</h1>
          <p className="text-[#C7C7C3] mb-4">{error}</p>
          <Link to="/admin/project-requests">
            <Button className="bg-[#1769E0] text-white hover:bg-[#0F56BD]">Back to Admin</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link
              to="/admin/project-requests"
              className="text-sm text-[#1769E0] hover:underline mb-4 inline-block"
            >
              ← Back to Project Requests
            </Link>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Manage Content</h1>
            <p className="mt-2 text-[#C7C7C3]">
              Add, edit, or remove thumbnails, workflow visuals, and extra videos.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-[#363636] bg-[#181818] p-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                {editingItem ? "Edit Item" : "Add New Item"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="section">Section</Label>
                  <Select
                    value={formData.section}
                    onValueChange={(value) => setFormData({ ...formData, section: value })}
                  >
                    <SelectTrigger className="bg-[#0A0A0A] border-[#363636] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#181818] border-[#363636] text-white">
                      {SECTIONS.map((section) => (
                        <SelectItem
                          key={section.value}
                          value={section.value}
                          className="text-white"
                        >
                          {section.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="bg-[#0A0A0A] border-[#363636] text-white"
                    placeholder="e.g., My Thumbnail"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="src">File Path / URL</Label>
                  <Input
                    id="src"
                    value={formData.src}
                    onChange={(e) => setFormData({ ...formData, src: e.target.value })}
                    required
                    className="bg-[#0A0A0A] border-[#363636] text-white"
                    placeholder="/assets/thumbniles/my-image.png"
                  />
                  <p className="text-xs text-[#92928D]">
                    Use web paths starting with /assets/. Example:{" "}
                    <code className="text-[#1769E0]">/assets/thumbniles/farmers.png</code>. Do not
                    use Windows paths like C:\ or project folder names.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger className="bg-[#0A0A0A] border-[#363636] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#181818] border-[#363636] text-white">
                      {ITEM_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="text-white">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category (optional)</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="bg-[#0A0A0A] border-[#363636] text-white"
                    placeholder="e.g., Skin Care, Video"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sort_order">Sort Order</Label>
                  <Input
                    id="sort_order"
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) =>
                      setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })
                    }
                    className="bg-[#0A0A0A] border-[#363636] text-white"
                    placeholder="0"
                  />
                  <p className="text-xs text-[#92928D]">
                    Lower numbers appear first. Items with the same section are ordered by this
                    field.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="h-4 w-4 rounded border-[#363636] bg-[#0A0A0A]"
                  />
                  <Label htmlFor="is_active" className="text-sm text-[#C7C7C3]">
                    Active (visible on site)
                  </Label>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-[#1769E0] text-white hover:bg-[#0F56BD]"
                  >
                    {isSubmitting ? "Saving..." : editingItem ? "Update" : "Add Item"}
                  </Button>
                  {editingItem && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="border-[#363636] text-white hover:bg-[#202020]"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-xl border border-[#363636] bg-[#181818] p-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                All Content ({items.length} items)
              </h2>

              {items.length === 0 ? (
                <p className="text-[#92928D] text-center py-8">
                  No content items yet. Add your first item.
                </p>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-lg border border-[#363636] bg-[#0A0A0A] p-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-semibold text-white truncate">
                            {item.title}
                          </h3>
                          <span className="px-2 py-0.5 rounded-md bg-[#1769E0]/20 text-[#1769E0] text-xs font-medium">
                            {getSectionLabel(item.section)}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-[#363636] text-[#C7C7C3] text-xs">
                            {item.type}
                          </span>
                          {!item.is_active && (
                            <span className="px-2 py-0.5 rounded-md bg-red-500/20 text-red-400 text-xs">
                              Inactive
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#92928D] truncate">{item.src}</p>
                        <p className="text-xs text-[#92928D]">Sort: {item.sort_order}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="border-[#363636] text-white hover:bg-[#202020]"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
