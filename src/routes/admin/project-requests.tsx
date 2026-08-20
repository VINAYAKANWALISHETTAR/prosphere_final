import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ProjectRequest = {
  id: string;
  reference_id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  user_type: string;
  company: string | null;
  website_url: string | null;
  project_type: string;
  specific_requirement: string | null;
  project_stage: string | null;
  application_type: string | null;
  timeline: string | null;
  budget: string | null;
  description: string;
  additional_requirements: string | null;
  help_required: string | null;
  college_university: string | null;
  course: string | null;
  year_of_study: string | null;
  brand: string;
  status: string;
  deadline: string | null;
  testing_authorized: boolean;
};

export const Route = createFileRoute("/admin/project-requests")({
  head: () => ({
    meta: [{ title: "Project Requests — Admin" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminProjectRequests,
});

function AdminProjectRequests() {
  const [requests, setRequests] = useState<ProjectRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    checkExistingSession();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchRequests();
    }
  }, [isAdmin]);

  const checkExistingSession = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setCheckingAuth(false);
        setLoading(false);
        return;
      }

      const { data, error: roleError } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });

      if (roleError) {
        setError(`Error checking admin role: ${roleError.message}`);
        setCheckingAuth(false);
        setLoading(false);
        return;
      }

      if (!data) {
        setError("Access denied. Admin privileges required.");
        setCheckingAuth(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);
      setCheckingAuth(false);
      setLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(`Failed to verify admin access: ${errorMessage}`);
      setCheckingAuth(false);
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const { data, error: loginErr } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginErr) {
        setLoginError(loginErr.message);
        setIsLoggingIn(false);
        return;
      }

      if (data.user) {
        const { data: roleData, error: roleError } = await supabase.rpc("has_role", {
          _user_id: data.user.id,
          _role: "admin",
        });

        if (roleError || !roleData) {
          setLoginError("Access denied. Admin privileges required.");
          await supabase.auth.signOut();
          setIsLoggingIn(false);
          return;
        }

        setIsAdmin(true);
        setCheckingAuth(false);
        setLoading(false);
        setIsLoggingIn(false);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setLoginError(`Login failed: ${errorMessage}`);
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      setIsAdmin(false);
      setRequests([]);
      setEmail("");
      setPassword("");
      setLoginError(null);
      setError(null);
      setCheckingAuth(false);
      setLoading(false);
    } catch (err) {
      // ignore logout errors
    } finally {
      setIsLoggingOut(false);
    }
  };

  const fetchRequests = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from("project_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) {
        setError(`Failed to fetch requests: ${fetchError.message}`);
        return;
      }

      setRequests(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(`Failed to fetch project requests: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const { error: updateError } = await supabase
        .from("project_requests")
        .update({ status: newStatus })
        .eq("id", id);

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req)),
      );
    } catch (err) {
      setError("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "contacted":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "discussing":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "proposal":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "in progress":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "closed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (checkingAuth || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#1769E0] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#C7C7C3]">
            {checkingAuth ? "Verifying access..." : "Loading requests..."}
          </p>
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
          <Link to="/">
            <Button className="bg-[#1769E0] text-white hover:bg-[#0F56BD]">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-4">
        <div className="w-full max-w-sm rounded-2xl border border-[#363636] bg-[#181818] p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">Admin Login</h1>
            <p className="mt-2 text-sm text-[#C7C7C3]">
              Sign in with your admin credentials to access project requests.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#0A0A0A] border-[#363636] text-white"
                placeholder="admin@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#0A0A0A] border-[#363636] text-white"
                placeholder="••••••••"
              />
            </div>

            {loginError && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3">
                <p className="text-sm text-red-400">{loginError}</p>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={isLoggingIn}
              className="w-full bg-[#1769E0] text-white hover:bg-[#0F56BD]"
            >
              {isLoggingIn ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link to="/" className="text-sm text-[#1769E0] hover:underline mb-4 inline-block">
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Admin Dashboard</h1>
            <p className="mt-2 text-[#C7C7C3]">Manage project requests and site content</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/admin/content">
              <Button variant="outline" className="border-[#363636] text-white hover:bg-[#202020]">
                Manage Content
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="border-[#363636] text-white hover:bg-[#202020]"
            >
              {isLoggingOut ? "Signing out..." : "Sign out"}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="rounded-xl border border-[#363636] bg-[#181818] p-6">
            <h3 className="text-sm font-medium text-[#92928D] mb-2">Total Requests</h3>
            <p className="text-3xl font-bold text-white">{requests.length}</p>
          </div>
          <div className="rounded-xl border border-[#363636] bg-[#181818] p-6">
            <h3 className="text-sm font-medium text-[#92928D] mb-2">New</h3>
            <p className="text-3xl font-bold text-blue-400">
              {requests.filter((r) => r.status === "new").length}
            </p>
          </div>
          <div className="rounded-xl border border-[#363636] bg-[#181818] p-6">
            <h3 className="text-sm font-medium text-[#92928D] mb-2">In Progress</h3>
            <p className="text-3xl font-bold text-cyan-400">
              {requests.filter((r) => r.status === "in progress").length}
            </p>
          </div>
          <div className="rounded-xl border border-[#363636] bg-[#181818] p-6">
            <h3 className="text-sm font-medium text-[#92928D] mb-2">Completed</h3>
            <p className="text-3xl font-bold text-green-400">
              {requests.filter((r) => r.status === "completed").length}
            </p>
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="rounded-2xl border border-[#363636] bg-[#181818] p-12 text-center">
            <p className="text-[#92928D]">No project requests yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="rounded-xl border border-[#363636] bg-[#181818] overflow-hidden"
              >
                <div
                  className="p-6 cursor-pointer hover:bg-[#202020] transition-colors"
                  onClick={() => setExpandedId(expandedId === request.id ? null : request.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{request.name}</h3>
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(request.status)}`}
                        >
                          {request.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#92928D]">
                        <span>{request.email}</span>
                        {request.phone && <span>• {request.phone}</span>}
                        <span>• {formatDate(request.created_at)}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="px-2 py-1 rounded-md bg-[#0A0A0A] text-xs text-[#C7C7C3] border border-[#363636]">
                          {request.user_type}
                        </span>
                        <span className="px-2 py-1 rounded-md bg-[#0A0A0A] text-xs text-[#1769E0] border border-[#1769E0]/30">
                          {request.project_type}
                        </span>
                        {request.specific_requirement && (
                          <span className="px-2 py-1 rounded-md bg-[#0A0A0A] text-xs text-[#E83E8C] border border-[#E83E8C]/30">
                            {request.specific_requirement}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={request.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateStatus(request.id, e.target.value);
                        }}
                        disabled={updatingId === request.id}
                        className="bg-[#0A0A0A] border border-[#363636] text-white text-sm rounded-md px-3 py-1.5 disabled:opacity-50"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="discussing">Discussing</option>
                        <option value="proposal">Proposal</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="closed">Closed</option>
                      </select>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#363636] text-white hover:bg-[#202020]"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedId(expandedId === request.id ? null : request.id);
                        }}
                      >
                        {expandedId === request.id ? "Hide" : "View"}
                      </Button>
                    </div>
                  </div>
                </div>

                {expandedId === request.id && (
                  <div className="border-t border-[#363636] bg-[#0A0A0A] p-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1769E0] mb-3">
                          Contact Information
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-[#92928D]">Reference ID:</span>
                            <span className="ml-2 text-white font-mono">
                              {request.reference_id}
                            </span>
                          </div>
                          <div>
                            <span className="text-[#92928D]">Name:</span>
                            <span className="ml-2 text-white">{request.name}</span>
                          </div>
                          <div>
                            <span className="text-[#92928D]">Email:</span>
                            <span className="ml-2 text-white">{request.email}</span>
                          </div>
                          {request.phone && (
                            <div>
                              <span className="text-[#92928D]">Phone:</span>
                              <span className="ml-2 text-white">{request.phone}</span>
                            </div>
                          )}
                          {request.company && (
                            <div>
                              <span className="text-[#92928D]">Company:</span>
                              <span className="ml-2 text-white">{request.company}</span>
                            </div>
                          )}
                          {request.website_url && (
                            <div>
                              <span className="text-[#92928D]">Website:</span>
                              <span className="ml-2 text-[#1769E0]">{request.website_url}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1769E0] mb-3">
                          Project Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-[#92928D]">User Type:</span>
                            <span className="ml-2 text-white">{request.user_type}</span>
                          </div>
                          <div>
                            <span className="text-[#92928D]">Project Type:</span>
                            <span className="ml-2 text-white">{request.project_type}</span>
                          </div>
                          {request.specific_requirement && (
                            <div>
                              <span className="text-[#92928D]">Specific Requirement:</span>
                              <span className="ml-2 text-white">
                                {request.specific_requirement}
                              </span>
                            </div>
                          )}
                          {request.project_stage && (
                            <div>
                              <span className="text-[#92928D]">Project Stage:</span>
                              <span className="ml-2 text-white">{request.project_stage}</span>
                            </div>
                          )}
                          {request.application_type && (
                            <div>
                              <span className="text-[#92928D]">Technology:</span>
                              <span className="ml-2 text-white">{request.application_type}</span>
                            </div>
                          )}
                          {request.timeline && (
                            <div>
                              <span className="text-[#92928D]">Timeline:</span>
                              <span className="ml-2 text-white">{request.timeline}</span>
                            </div>
                          )}
                          {request.budget && (
                            <div>
                              <span className="text-[#92928D]">Budget:</span>
                              <span className="ml-2 text-white">{request.budget}</span>
                            </div>
                          )}
                          {request.deadline && (
                            <div>
                              <span className="text-[#92928D]">Deadline:</span>
                              <span className="ml-2 text-white">{request.deadline}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {request.user_type === "student" && (
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1769E0] mb-3">
                            Student Information
                          </h4>
                          <div className="space-y-2 text-sm">
                            {request.college_university && (
                              <div>
                                <span className="text-[#92928D]">College/University:</span>
                                <span className="ml-2 text-white">
                                  {request.college_university}
                                </span>
                              </div>
                            )}
                            {request.course && (
                              <div>
                                <span className="text-[#92928D]">Course:</span>
                                <span className="ml-2 text-white">{request.course}</span>
                              </div>
                            )}
                            {request.year_of_study && (
                              <div>
                                <span className="text-[#92928D]">Year:</span>
                                <span className="ml-2 text-white">{request.year_of_study}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1769E0] mb-3">
                          Description
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-[#92928D] block mb-1">Project Description:</span>
                            <p className="text-white bg-[#181818] p-3 rounded-lg border border-[#363636]">
                              {request.description}
                            </p>
                          </div>
                          {request.additional_requirements && (
                            <div>
                              <span className="text-[#92928D] block mb-1">
                                Additional Requirements:
                              </span>
                              <p className="text-white bg-[#181818] p-3 rounded-lg border border-[#363636]">
                                {request.additional_requirements}
                              </p>
                            </div>
                          )}
                          {request.help_required && (
                            <div>
                              <span className="text-[#92928D] block mb-1">Help Required:</span>
                              <p className="text-white bg-[#181818] p-3 rounded-lg border border-[#363636]">
                                {request.help_required}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#363636] flex items-center justify-between">
                      <span className="text-xs text-[#92928D]">
                        Submitted on {formatDate(request.created_at)}
                      </span>
                      <span className="text-xs text-[#92928D]">Brand: {request.brand}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
