import { useState, useMemo, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ShieldAlert, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AUTHORIZATION_STATEMENT, prosphereServices, type Service } from "@/data/prosphere";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Search = { service?: string | undefined; brand?: string | undefined };

type UserType = "business" | "individual" | "student";

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  website_url?: string;
  project_type?: string;
  specific_requirement?: string;
  project_stage?: string;
  application_type?: string;
  timeline?: string;
  budget?: string;
  description?: string;
  additional_requirements?: string;
  help_required?: string;
  college_university?: string;
  course?: string;
  year_of_study?: string;
  other_project_type?: string;
  other_requirement?: string;
  deadline?: string;
};

const BUSINESS_CATEGORIES = [
  "Website",
  "Application",
  "AI",
  "Video",
  "Design",
  "Automation",
  "Data / Excel",
  "Presentation",
  "Security",
  "Testing",
  "Maintenance",
  "Technical Support",
  "Other",
];

const BUSINESS_SUB_CATEGORIES: Record<string, string[]> = {
  Security: [
    "Website Security Assessment",
    "Application Security Assessment",
    "Vulnerability Identification",
    "Security Testing",
    "Security Configuration Review",
    "Security Hardening",
  ],
  Testing: [
    "Website Testing",
    "Application Testing",
    "Functional Testing",
    "UI Testing",
    "Compatibility Testing",
    "Performance Testing",
    "Regression Testing",
    "Quality Assurance",
    "Bug Identification",
  ],
  Maintenance: [
    "Bug Fixing",
    "Technical Maintenance",
    "Performance Optimisation",
    "Content & Technical Updates",
    "Dependency & Update Review",
    "Backup & Recovery Guidance",
  ],
  "Technical Support": [
    "Troubleshooting",
    "Technical Consultation",
    "Website Issue Analysis",
    "Application Issue Analysis",
    "Deployment Assistance",
    "Configuration Assistance",
  ],
};

const INDIVIDUAL_SERVICES = [
  "Website",
  "Application",
  "AI solution",
  "Video",
  "Design",
  "Automation",
  "Presentation",
  "Excel / Data",
  "Other",
];

const STUDENT_PROJECT_TYPES = [
  "Final-year project",
  "Academic project",
  "Website",
  "Application",
  "AI project",
  "Automation",
  "Data / Excel",
  "Presentation",
  "Video / Creative",
  "Other",
];

const TIMELINES = [
  "As soon as possible",
  "Within 1–2 weeks",
  "Within 1 month",
  "1–3 months",
  "Flexible / No fixed deadline",
];

const BUDGET_RANGES = [
  "Not decided",
  "Under ₹10,000",
  "₹10,000–₹25,000",
  "₹25,000–₹50,000",
  "₹50,000+",
  "Prefer to discuss",
];

const YEARS_OF_STUDY = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Postgraduate", "Other"];

const COUNTRY_CODES = [
  { code: "+91", country: "India", digits: 10 },
  { code: "+1", country: "USA/Canada", digits: 10 },
  { code: "+44", country: "UK", digits: 10 },
  { code: "+61", country: "Australia", digits: 9 },
  { code: "+65", country: "Singapore", digits: 8 },
  { code: "+971", country: "UAE", digits: 9 },
  { code: "+48", country: "Poland", digits: 9 },
  { code: "+49", country: "Germany", digits: 10 },
  { code: "+33", country: "France", digits: 9 },
  { code: "+81", country: "Japan", digits: 10 },
  { code: "+82", country: "South Korea", digits: 10 },
  { code: "+86", country: "China", digits: 11 },
];

const STEPS = [
  { label: "About You", key: "about" },
  { label: "Your Project", key: "project" },
  { label: "Requirements", key: "requirements" },
  { label: "Submit", key: "submit" },
];

function generateReferenceId(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `PS-${year}-${random}`;
}

export const Route = createFileRoute("/start-project")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    service: typeof search["service"] === "string" ? search["service"] : undefined,
    brand: search["brand"] === "digicrystal" ? "digicrystal" : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Start a Project — ProSphere Request Form" },
      {
        name: "description",
        content:
          "Submit a project request to ProSphere or DigiCrystal Technologies. Security testing requires confirmed authorisation for the systems in scope.",
      },
      { property: "og:title", content: "Start a Project — ProSphere Request Form" },
      {
        property: "og:description",
        content: "Tell us about your website or application and the service you need.",
      },
    ],
  }),
  component: StartProjectPage,
});

function StartProjectPage() {
  const { service, brand } = Route.useSearch();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [userType, setUserType] = useState<UserType | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    company: "",
    website_url: "",
    project_type: "",
    specific_requirement: "",
    project_stage: "",
    application_type: "",
    timeline: "",
    budget: "",
    description: "",
    additional_requirements: "",
    help_required: "",
    college_university: "",
    course: "",
    year_of_study: "",
    other_project_type: "",
    other_requirement: "",
    deadline: "",
    authorized: false,
    privacyAccepted: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = sessionStorage.getItem("projectEnquiryForm");
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.error("Failed to load form data from sessionStorage:", e);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.setItem("projectEnquiryForm", JSON.stringify(formData));
    } catch (e) {
      console.error("Failed to save form data to sessionStorage:", e);
    }
  }, [formData]);

  const selectedService = useMemo(() => {
    return prosphereServices.find((s) => s.slug === service);
  }, [service]);

  const needsAuthorization =
    formData.project_type.toLowerCase().includes("security") ||
    selectedService?.category === "security";

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateEmail = (email: string): boolean => {
    const trimmed = email.trim();
    if (trimmed.length === 0 || trimmed.length > 100) return false;
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(trimmed);
  };

  const validatePhone = (): boolean => {
    if (!formData.phone) return true;
    const digits = formData.phone.replace(/\D/g, "");
    const selected = COUNTRY_CODES.find((c) => c.code === formData.countryCode);
    const requiredDigits = selected?.digits ?? 10;
    if (digits.length !== requiredDigits) return false;
    return /^[0-9]+$/.test(digits);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 0) {
      if (!formData.name.trim()) newErrors.name = "Please enter your full name.";
      else if (formData.name.trim().length < 2)
        newErrors.name = "Your name must be at least 2 characters.";
      else if (formData.name.trim().length > 30)
        newErrors.name = "Your name must be 30 characters or fewer.";
      else if (/\d/.test(formData.name)) newErrors.name = "Your name cannot contain numbers.";

      if (!formData.email.trim()) newErrors.email = "Please enter a valid email address.";
      else if (!validateEmail(formData.email))
        newErrors.email = "Please enter a valid email address.";
      else if (formData.email.length > 100)
        newErrors.email = "Email must be 100 characters or fewer.";

      if (formData.phone && !validatePhone()) {
        const selected = COUNTRY_CODES.find((c) => c.code === formData.countryCode);
        const requiredDigits = selected?.digits ?? 10;
        newErrors.phone = `Please enter a valid ${requiredDigits}-digit phone number.`;
      }

      if (userType === "business") {
        if (formData.company && formData.company.length > 100)
          newErrors.company = "Company name must be 100 characters or fewer.";
        if (formData.website_url && formData.website_url.length > 0) {
          try {
            new URL(formData.website_url);
          } catch {
            newErrors.website_url = "Please enter a valid URL.";
          }
        }
      }
    }

    if (step === 1) {
      if (!formData.project_type.trim()) newErrors.project_type = "Please select a project type.";

      if (userType === "business") {
        if (formData.specific_requirement && formData.specific_requirement.length > 100)
          newErrors.specific_requirement = "Must be 100 characters or fewer.";
        if (formData.project_stage && formData.project_stage.length > 100)
          newErrors.project_stage = "Must be 100 characters or fewer.";
        if (formData.application_type && formData.application_type.length > 100)
          newErrors.application_type = "Must be 100 characters or fewer.";
      }

      if (
        userType === "student" &&
        formData.project_type === "Other" &&
        !formData.other_project_type.trim()
      ) {
        newErrors.other_project_type = "Please describe your project type.";
      }
      if (
        userType === "individual" &&
        formData.project_type === "Other" &&
        !formData.other_requirement.trim()
      ) {
        newErrors.other_requirement = "Please describe your requirement.";
      }
    }

    if (step === 2) {
      if (!formData.description.trim()) newErrors.description = "Please describe your project.";
      else if (formData.description.length > 1500)
        newErrors.description = "Project description must be 1,500 characters or fewer.";

      if (formData.additional_requirements && formData.additional_requirements.length > 1000)
        newErrors.additional_requirements =
          "Additional requirements must be 1,000 characters or fewer.";

      if (userType === "student") {
        if (!formData.help_required.trim())
          newErrors.help_required = "Please describe what help you need.";
        else if (formData.help_required.length > 500)
          newErrors.help_required = "Help required must be 500 characters or fewer.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateStep(2)) return;
    if (!formData.privacyAccepted) {
      toast.error("Please accept the privacy policy to continue.");
      return;
    }
    if (needsAuthorization && !formData.authorized) {
      toast.error("Please confirm testing authorization before submitting.");
      return;
    }

    setSubmitting(true);

    const refId = generateReferenceId();

    const { error } = await supabase.from("project_requests").insert({
      reference_id: refId,
      brand: brand === "digicrystal" ? "digicrystal" : "prosphere",
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone || null,
      user_type: userType || "individual",
      company: userType === "business" ? formData.company.trim() || null : null,
      website_url: userType === "business" ? formData.website_url.trim() || null : null,
      application_type: formData.application_type.trim() || null,
      project_type: formData.project_type || "Not specified",
      specific_requirement: formData.specific_requirement.trim() || null,
      project_stage: formData.project_stage.trim() || null,
      timeline: formData.timeline || null,
      budget: formData.budget || null,
      description: formData.description.trim(),
      additional_requirements: formData.additional_requirements.trim() || null,
      help_required: userType === "student" ? formData.help_required.trim() || null : null,
      college_university:
        userType === "student" ? formData.college_university.trim() || null : null,
      course: userType === "student" ? formData.course.trim() || null : null,
      year_of_study: userType === "student" ? formData.year_of_study || null : null,
      priority: "Normal",
      testing_authorized: needsAuthorization ? formData.authorized : false,
      deadline: formData.deadline || null,
    });

    setSubmitting(false);
    if (error) {
      toast.error("Something went wrong sending your request. Please try again.");
      return;
    }

    setReferenceId(refId);
    setDone(true);
    toast.success("Enquiry received. We'll be in touch shortly.");
  };

  const renderUserTypeSelector = () => (
    <div className="space-y-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1769E0]">
        Who are you?
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { value: "business", label: "Business / Organisation" },
          { value: "individual", label: "Individual" },
          { value: "student", label: "Student" },
        ].map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              setUserType(option.value as UserType);
              setCurrentStep(0);
              setErrors({});
            }}
            className={`rounded-xl border px-4 py-4 text-sm font-medium transition-all ${
              userType === option.value
                ? "border-[#1769E0] bg-[#1769E0]/10 text-[#1769E0]"
                : "border-[#363636] bg-[#0A0A0A] text-[#C7C7C3] hover:border-[#1769E0]/50"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );

  const renderStepIndicator = () => (
    <div className="mb-8 flex items-center justify-between">
      {STEPS.map((step, idx) => (
        <div key={step.key} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold ${
                idx <= currentStep ? "text-[#1769E0]" : "text-[#363636]"
              }`}
            >
              {String(idx + 1).padStart(2, "0")}
            </span>
            <span
              className={`text-xs font-medium ${
                idx <= currentStep ? "text-white" : "text-[#363636]"
              }`}
            >
              {step.label}
            </span>
          </div>
          {idx < STEPS.length - 1 && (
            <ChevronRight
              className={`mx-2 size-3 ${idx < currentStep ? "text-[#1769E0]" : "text-[#363636]"}`}
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderBusinessForm = () => (
    <>
      <div className="space-y-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1769E0]">
            01 — About You
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">
                Full name <span className="text-[#E83E8C]">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                required
                maxLength={30}
                className={`bg-[#0A0A0A] border-[#363636] text-white ${
                  errors.name ? "border-[#E83E8C]" : ""
                }`}
              />
              {errors.name && <p className="text-xs text-[#E83E8C]">{errors.name}</p>}
              <p className="text-[10px] text-[#92928D]">{formData.name.length} / 30</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                Work / personal email <span className="text-[#E83E8C]">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                required
                maxLength={100}
                className={`bg-[#0A0A0A] border-[#363636] text-white ${
                  errors.email ? "border-[#E83E8C]" : ""
                }`}
              />
              {errors.email && <p className="text-xs text-[#E83E8C]">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <div className="flex gap-2">
                <Select
                  value={formData.countryCode}
                  onValueChange={(v) => updateField("countryCode", v)}
                >
                  <SelectTrigger className="w-[100px] bg-[#0A0A0A] border-[#363636] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#181818] border-[#363636] text-white">
                    {COUNTRY_CODES.map((c) => (
                      <SelectItem key={c.code} value={c.code} className="text-white">
                        {c.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                    updateField("phone", val);
                  }}
                  maxLength={10}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="tel"
                  className={`flex-1 bg-[#0A0A0A] border-[#363636] text-white ${
                    errors.phone ? "border-[#E83E8C]" : ""
                  }`}
                />
              </div>
              {errors.phone && <p className="text-xs text-[#E83E8C]">{errors.phone}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company / Organisation</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => updateField("company", e.target.value)}
                maxLength={100}
                className={`bg-[#0A0A0A] border-[#363636] text-white ${
                  errors.company ? "border-[#E83E8C]" : ""
                }`}
              />
              {errors.company && <p className="text-xs text-[#E83E8C]">{errors.company}</p>}
              <p className="text-[10px] text-[#92928D]">{formData.company.length} / 100</p>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="website_url">Website / Application URL</Label>
              <Input
                id="website_url"
                type="url"
                placeholder="https://"
                value={formData.website_url}
                onChange={(e) => updateField("website_url", e.target.value)}
                className={`bg-[#0A0A0A] border-[#363636] text-white ${
                  errors.website_url ? "border-[#E83E8C]" : ""
                }`}
              />
              {errors.website_url && <p className="text-xs text-[#E83E8C]">{errors.website_url}</p>}
            </div>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1769E0]">
            02 — Your Project
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="project_type">
                Service / Project Category <span className="text-[#E83E8C]">*</span>
              </Label>
              <Select
                value={formData.project_type}
                onValueChange={(v) => updateField("project_type", v)}
              >
                <SelectTrigger
                  id="project_type"
                  className={`bg-[#0A0A0A] border-[#363636] text-white ${
                    errors.project_type ? "border-[#E83E8C]" : ""
                  }`}
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-[#181818] border-[#363636] text-white">
                  {BUSINESS_CATEGORIES.map((t) => (
                    <SelectItem key={t} value={t} className="text-white">
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.project_type && (
                <p className="text-xs text-[#E83E8C]">{errors.project_type}</p>
              )}
            </div>
            {formData.project_type && BUSINESS_SUB_CATEGORIES[formData.project_type] && (
              <div className="space-y-2">
                <Label htmlFor="specific_requirement">Specific Requirement</Label>
                <Select
                  value={formData.specific_requirement}
                  onValueChange={(v) => updateField("specific_requirement", v)}
                >
                  <SelectTrigger
                    id="specific_requirement"
                    className={`bg-[#0A0A0A] border-[#363636] text-white ${
                      errors.specific_requirement ? "border-[#E83E8C]" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select a requirement" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#181818] border-[#363636] text-white">
                    {BUSINESS_SUB_CATEGORIES[formData.project_type].map((t) => (
                      <SelectItem key={t} value={t} className="text-white">
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="project_stage">Current Project Stage</Label>
              <Input
                id="project_stage"
                value={formData.project_stage}
                onChange={(e) => updateField("project_stage", e.target.value)}
                maxLength={100}
                placeholder="e.g. planning, in progress, launched"
                className={`bg-[#0A0A0A] border-[#363636] text-white ${
                  errors.project_stage ? "border-[#E83E8C]" : ""
                }`}
              />
              {errors.project_stage && (
                <p className="text-xs text-[#E83E8C]">{errors.project_stage}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="application_type">Platform / Technology</Label>
              <Input
                id="application_type"
                value={formData.application_type}
                onChange={(e) => updateField("application_type", e.target.value)}
                maxLength={100}
                placeholder="WordPress, React, Shopify, custom…"
                className={`bg-[#0A0A0A] border-[#363636] text-white ${
                  errors.application_type ? "border-[#E83E8C]" : ""
                }`}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline</Label>
              <Select value={formData.timeline} onValueChange={(v) => updateField("timeline", v)}>
                <SelectTrigger id="timeline" className="bg-[#0A0A0A] border-[#363636] text-white">
                  <SelectValue placeholder="Select a timeline" />
                </SelectTrigger>
                <SelectContent className="bg-[#181818] border-[#363636] text-white">
                  {TIMELINES.map((t) => (
                    <SelectItem key={t} value={t} className="text-white">
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Select value={formData.budget} onValueChange={(v) => updateField("budget", v)}>
                <SelectTrigger id="budget" className="bg-[#0A0A0A] border-[#363636] text-white">
                  <SelectValue placeholder="Select a budget range" />
                </SelectTrigger>
                <SelectContent className="bg-[#181818] border-[#363636] text-white">
                  {BUDGET_RANGES.map((t) => (
                    <SelectItem key={t} value={t} className="text-white">
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderIndividualForm = () => (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1769E0]">
          01 — About You
        </p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">
              Full name <span className="text-[#E83E8C]">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
              maxLength={30}
              className={`bg-[#0A0A0A] border-[#363636] text-white ${
                errors.name ? "border-[#E83E8C]" : ""
              }`}
            />
            {errors.name && <p className="text-xs text-[#E83E8C]">{errors.name}</p>}
            <p className="text-[10px] text-[#92928D]">{formData.name.length} / 30</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-[#E83E8C]">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              required
              maxLength={100}
              className={`bg-[#0A0A0A] border-[#363636] text-white ${
                errors.email ? "border-[#E83E8C]" : ""
              }`}
            />
            {errors.email && <p className="text-xs text-[#E83E8C]">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="flex gap-2">
              <Select
                value={formData.countryCode}
                onValueChange={(v) => updateField("countryCode", v)}
              >
                <SelectTrigger className="w-[100px] bg-[#0A0A0A] border-[#363636] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#181818] border-[#363636] text-white">
                  {COUNTRY_CODES.map((c) => (
                    <SelectItem key={c.code} value={c.code} className="text-white">
                      {c.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                  updateField("phone", val);
                }}
                maxLength={10}
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="tel"
                className={`flex-1 bg-[#0A0A0A] border-[#363636] text-white ${
                  errors.phone ? "border-[#E83E8C]" : ""
                }`}
              />
            </div>
            {errors.phone && <p className="text-xs text-[#E83E8C]">{errors.phone}</p>}
          </div>
        </div>
      </div>

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1769E0]">
          02 — What do you want to create?
        </p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="project_type">
              Service / project type <span className="text-[#E83E8C]">*</span>
            </Label>
            <Select
              value={formData.project_type}
              onValueChange={(v) => updateField("project_type", v)}
            >
              <SelectTrigger
                id="project_type"
                className={`bg-[#0A0A0A] border-[#363636] text-white ${
                  errors.project_type ? "border-[#E83E8C]" : ""
                }`}
              >
                <SelectValue placeholder="Select a project type" />
              </SelectTrigger>
              <SelectContent className="bg-[#181818] border-[#363636] text-white">
                {INDIVIDUAL_SERVICES.map((t) => (
                  <SelectItem key={t} value={t} className="text-white">
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.project_type && <p className="text-xs text-[#E83E8C]">{errors.project_type}</p>}
          </div>
          {formData.project_type === "Other" && (
            <div className="space-y-2">
              <Label htmlFor="other_requirement">Other requirement</Label>
              <Input
                id="other_requirement"
                value={formData.other_requirement}
                onChange={(e) => updateField("other_requirement", e.target.value)}
                maxLength={100}
                className={`bg-[#0A0A0A] border-[#363636] text-white ${
                  errors.other_requirement ? "border-[#E83E8C]" : ""
                }`}
              />
              {errors.other_requirement && (
                <p className="text-xs text-[#E83E8C]">{errors.other_requirement}</p>
              )}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="timeline">Timeline</Label>
            <Select value={formData.timeline} onValueChange={(v) => updateField("timeline", v)}>
              <SelectTrigger id="timeline" className="bg-[#0A0A0A] border-[#363636] text-white">
                <SelectValue placeholder="Select a timeline" />
              </SelectTrigger>
              <SelectContent className="bg-[#181818] border-[#363636] text-white">
                {TIMELINES.map((t) => (
                  <SelectItem key={t} value={t} className="text-white">
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudentInfoStep = () => (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1769E0]">
          01 — Student Information
        </p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">
              Full name <span className="text-[#E83E8C]">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
              maxLength={30}
              className={`bg-[#0A0A0A] border-[#363636] text-white ${
                errors.name ? "border-[#E83E8C]" : ""
              }`}
            />
            {errors.name && <p className="text-xs text-[#E83E8C]">{errors.name}</p>}
            <p className="text-[10px] text-[#92928D]">{formData.name.length} / 30</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-[#E83E8C]">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              required
              maxLength={100}
              className={`bg-[#0A0A0A] border-[#363636] text-white ${
                errors.email ? "border-[#E83E8C]" : ""
              }`}
            />
            {errors.email && <p className="text-xs text-[#E83E8C]">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="flex gap-2">
              <Select
                value={formData.countryCode}
                onValueChange={(v) => updateField("countryCode", v)}
              >
                <SelectTrigger className="w-[100px] bg-[#0A0A0A] border-[#363636] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#181818] border-[#363636] text-white">
                  {COUNTRY_CODES.map((c) => (
                    <SelectItem key={c.code} value={c.code} className="text-white">
                      {c.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                  updateField("phone", val);
                }}
                maxLength={10}
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="tel"
                className={`flex-1 bg-[#0A0A0A] border-[#363636] text-white ${
                  errors.phone ? "border-[#E83E8C]" : ""
                }`}
              />
            </div>
            {errors.phone && <p className="text-xs text-[#E83E8C]">{errors.phone}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="college_university">
              College / University <span className="text-[#E83E8C]">*</span>
            </Label>
            <Input
              id="college_university"
              value={formData.college_university}
              onChange={(e) => updateField("college_university", e.target.value)}
              required
              maxLength={100}
              className={`bg-[#0A0A0A] border-[#363636] text-white ${
                errors.college_university ? "border-[#E83E8C]" : ""
              }`}
            />
            {errors.college_university && (
              <p className="text-xs text-[#E83E8C]">{errors.college_university}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="course">Course / Program</Label>
            <Input
              id="course"
              value={formData.course}
              onChange={(e) => updateField("course", e.target.value)}
              maxLength={100}
              className="bg-[#0A0A0A] border-[#363636] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="year_of_study">
              Year of study <span className="text-[#E83E8C]">*</span>
            </Label>
            <Select
              value={formData.year_of_study}
              onValueChange={(v) => updateField("year_of_study", v)}
            >
              <SelectTrigger
                id="year_of_study"
                className={`bg-[#0A0A0A] border-[#363636] text-white ${
                  errors.year_of_study ? "border-[#E83E8C]" : ""
                }`}
              >
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent className="bg-[#181818] border-[#363636] text-white">
                {YEARS_OF_STUDY.map((t) => (
                  <SelectItem key={t} value={t} className="text-white">
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.year_of_study && (
              <p className="text-xs text-[#E83E8C]">{errors.year_of_study}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudentProjectStep = () => (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1769E0]">
          02 — Student Project
        </p>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="project_type">
              Project type <span className="text-[#E83E8C]">*</span>
            </Label>
            <Select
              value={formData.project_type}
              onValueChange={(v) => updateField("project_type", v)}
            >
              <SelectTrigger
                id="project_type"
                className={`bg-[#0A0A0A] border-[#363636] text-white ${
                  errors.project_type ? "border-[#E83E8C]" : ""
                }`}
              >
                <SelectValue placeholder="Select a project type" />
              </SelectTrigger>
              <SelectContent className="bg-[#181818] border-[#363636] text-white">
                {STUDENT_PROJECT_TYPES.map((t) => (
                  <SelectItem key={t} value={t} className="text-white">
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.project_type && <p className="text-xs text-[#E83E8C]">{errors.project_type}</p>}
          </div>
          {formData.project_type === "Other" && (
            <div className="space-y-2">
              <Label htmlFor="other_project_type">Other project type</Label>
              <Input
                id="other_project_type"
                value={formData.other_project_type}
                onChange={(e) => updateField("other_project_type", e.target.value)}
                maxLength={100}
                className={`bg-[#0A0A0A] border-[#363636] text-white ${
                  errors.other_project_type ? "border-[#E83E8C]" : ""
                }`}
              />
              {errors.other_project_type && (
                <p className="text-xs text-[#E83E8C]">{errors.other_project_type}</p>
              )}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => updateField("deadline", e.target.value)}
              className="bg-[#0A0A0A] border-[#363636] text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderRequirementsStep = () => (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1769E0]">
          {userType === "student" ? "03 — Help Required" : "03 — Requirements"}
        </p>
        <div className="mt-4 space-y-5">
          {userType === "student" ? (
            <div className="space-y-2">
              <Label htmlFor="help_required">
                What kind of help do you need? <span className="text-[#E83E8C]">*</span>
              </Label>
              <Textarea
                id="help_required"
                value={formData.help_required}
                onChange={(e) => updateField("help_required", e.target.value)}
                required
                maxLength={500}
                rows={4}
                placeholder="Tell us what you need help with, what you have completed so far, and what you want to achieve."
                className={`bg-[#0A0A0A] border-[#363636] text-white ${
                  errors.help_required ? "border-[#E83E8C]" : ""
                }`}
              />
              {errors.help_required && (
                <p className="text-xs text-[#E83E8C]">{errors.help_required}</p>
              )}
              <p className="text-[10px] text-[#92928D]">{formData.help_required.length} / 500</p>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="description">
                Project description <span className="text-[#E83E8C]">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                required
                maxLength={1500}
                rows={6}
                placeholder="Tell us what you are building, what problem you want to solve, what you have already tried, and what a successful outcome looks like."
                className={`bg-[#0A0A0A] border-[#363636] text-white ${
                  errors.description ? "border-[#E83E8C]" : ""
                }`}
              />
              {errors.description && <p className="text-xs text-[#E83E8C]">{errors.description}</p>}
              <p className="text-[10px] text-[#92928D]">{formData.description.length} / 1500</p>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="additional_requirements">Additional requirements</Label>
            <Textarea
              id="additional_requirements"
              value={formData.additional_requirements}
              onChange={(e) => updateField("additional_requirements", e.target.value)}
              maxLength={1000}
              rows={3}
              className={`bg-[#0A0A0A] border-[#363636] text-white ${
                errors.additional_requirements ? "border-[#E83E8C]" : ""
              }`}
            />
            {errors.additional_requirements && (
              <p className="text-xs text-[#E83E8C]">{errors.additional_requirements}</p>
            )}
            <p className="text-[10px] text-[#92928D]">
              {formData.additional_requirements.length} / 1000
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSubmitStep = () => (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1769E0]">
          04 — Submit
        </p>
        <div className="mt-4 rounded-xl border border-[#363636] bg-[#0A0A0A] p-6">
          <h3 className="text-sm font-semibold text-white">Review your enquiry</h3>
          <div className="mt-4 space-y-3 text-sm text-[#C7C7C3]">
            <div className="grid grid-cols-3 gap-2">
              <span className="text-[#92928D]">Name:</span>
              <span className="col-span-2">{formData.name}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-[#92928D]">Email:</span>
              <span className="col-span-2">{formData.email}</span>
            </div>
            {formData.phone && (
              <div className="grid grid-cols-3 gap-2">
                <span className="text-[#92928D]">Phone:</span>
                <span className="col-span-2">
                  {formData.countryCode} {formData.phone}
                </span>
              </div>
            )}
            {userType === "business" && formData.company && (
              <div className="grid grid-cols-3 gap-2">
                <span className="text-[#92928D]">Company:</span>
                <span className="col-span-2">{formData.company}</span>
              </div>
            )}
            {userType === "student" && (
              <>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-[#92928D]">College:</span>
                  <span className="col-span-2">{formData.college_university}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-[#92928D]">Course:</span>
                  <span className="col-span-2">{formData.course}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-[#92928D]">Year:</span>
                  <span className="col-span-2">{formData.year_of_study}</span>
                </div>
              </>
            )}
            <div className="grid grid-cols-3 gap-2">
              <span className="text-[#92928D]">Project type:</span>
              <span className="col-span-2">{formData.project_type}</span>
            </div>
            {formData.timeline && (
              <div className="grid grid-cols-3 gap-2">
                <span className="text-[#92928D]">Timeline:</span>
                <span className="col-span-2">{formData.timeline}</span>
              </div>
            )}
            {userType !== "student" && (
              <div className="grid grid-cols-3 gap-2">
                <span className="text-[#92928D]">Description:</span>
                <span className="col-span-2 line-clamp-3">{formData.description}</span>
              </div>
            )}
            {userType === "student" && (
              <div className="grid grid-cols-3 gap-2">
                <span className="text-[#92928D]">Help needed:</span>
                <span className="col-span-2 line-clamp-3">{formData.help_required}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {needsAuthorization && (
          <div className="rounded-xl border border-[#1769E0]/30 bg-[#1769E0]/5 p-5">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-0.5 size-5 shrink-0 text-[#1769E0]" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold text-white">Testing authorization required</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#C7C7C3]">
                  {AUTHORIZATION_STATEMENT}
                </p>
                <div className="mt-4 flex items-start gap-3">
                  <Checkbox
                    id="authorized"
                    checked={formData.authorized}
                    onCheckedChange={(v) => updateField("authorized", v === true)}
                    aria-describedby="authorized-desc"
                  />
                  <Label
                    htmlFor="authorized"
                    id="authorized-desc"
                    className="text-sm font-normal leading-relaxed text-[#C7C7C3]"
                  >
                    I confirm I own the systems listed above, or I am formally authorised by the
                    owner to request security testing on them.
                  </Label>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <Checkbox
              id="privacy"
              checked={formData.privacyAccepted}
              onCheckedChange={(v) => updateField("privacyAccepted", v === true)}
              aria-describedby="privacy-desc"
            />
            <Label
              htmlFor="privacy"
              id="privacy-desc"
              className="text-sm font-normal leading-relaxed text-[#C7C7C3]"
            >
              By submitting this form, you agree that we may use the information provided to respond
              to your enquiry. View our{" "}
              <Link to="/privacy" className="text-[#1769E0] underline underline-offset-4">
                Privacy Policy
              </Link>
              .
            </Label>
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="w-full sm:w-auto bg-[#1769E0] text-white hover:bg-[#0F56BD]"
        >
          {submitting ? "Sending…" : "Send Project Enquiry →"}
        </Button>
        <p className="text-xs text-[#92928D]">
          We&apos;ll review your enquiry and get back to you using the contact details provided.
        </p>
      </div>
    </div>
  );

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <CheckCircle2 className="mx-auto size-12 text-[#4CCB91]" aria-hidden="true" />
        <h1 className="mt-6 text-3xl font-bold text-white">Enquiry received ✓</h1>
        <p className="mt-3 text-[#92928D]">
          Thanks, we&apos;ve received your project details. We&apos;ll review your requirements and
          contact you using the details provided.
        </p>
        <div className="mt-4 rounded-xl border border-[#363636] bg-[#0A0A0A] p-4">
          <p className="text-xs text-[#92928D]">Reference ID</p>
          <p className="mt-1 text-lg font-mono font-semibold text-[#1769E0]">{referenceId}</p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild className="bg-[#1769E0] text-white hover:bg-[#0F56BD]">
            <Link to="/">Back to Home</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-[#363636] text-white hover:bg-[#202020]"
          >
            <Link to="/services">Explore Services</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="navy-panel">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-navy-foreground sm:text-5xl">Start a Project</h1>
          <p className="mt-4 max-w-2xl text-navy-foreground/75">
            Tell us what you&apos;re building. Whether you&apos;re a business, individual, or
            student, tell us what you need and we&apos;ll help you figure out the right approach.
          </p>
          {selectedService && (
            <p className="mt-4 inline-flex rounded-full bg-[#1769E0]/15 px-3 py-1 text-sm font-medium text-[#1769E0]">
              Requesting: {selectedService.name}
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[#363636] bg-[#181818] p-6 shadow-card sm:p-8"
        >
          {!userType ? (
            renderUserTypeSelector()
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-xs font-medium text-[#C7C7C3]">
                  {userType === "business"
                    ? "Business / Organisation"
                    : userType === "individual"
                      ? "Individual"
                      : "Student"}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setUserType(null);
                    setCurrentStep(0);
                    setErrors({});
                  }}
                  className="text-xs text-[#1769E0] hover:underline"
                >
                  Change
                </button>
              </div>
              {renderStepIndicator()}
              {currentStep === 0 &&
                (userType === "business"
                  ? renderBusinessForm()
                  : userType === "individual"
                    ? renderIndividualForm()
                    : renderStudentInfoStep())}
              {currentStep === 1 &&
                (userType === "student"
                  ? renderStudentProjectStep()
                  : userType === "individual"
                    ? renderIndividualForm()
                    : renderBusinessForm())}
              {currentStep === 2 && renderRequirementsStep()}
              {currentStep === 3 && renderSubmitStep()}

              <div className="mt-8 flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="border-[#363636] text-white hover:bg-[#202020]"
                >
                  Back
                </Button>
                {currentStep < 3 && (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#1769E0] text-white hover:bg-[#0F56BD]"
                  >
                    Continue <ChevronRight className="ml-2 size-4" aria-hidden="true" />
                  </Button>
                )}
              </div>
            </>
          )}
        </form>
      </section>
    </div>
  );
}
