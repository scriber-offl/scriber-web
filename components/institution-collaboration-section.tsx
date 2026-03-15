"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createLead } from "@/actions/create-lead";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const collaborationOptions = [
  "Teaching-Learning Materials Development",
  "Curriculum Support",
  "Classroom Resources",
  "Digital Learning Materials",
  "Other",
] as const;

const gradeLevelOptions = [
  "Primary School",
  "Middle School",
  "High School",
  "Higher Secondary",
] as const;

const preferredContactOptions = ["Phone", "Mail"] as const;

type PreferredContact = (typeof preferredContactOptions)[number] | "";

export function InstitutionCollaborationSection() {
  const { data: session } = authClient.useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    institutionName: "",
    position: "",
    phone: "",
    email: "",
    institutionAddress: "",
    collaborationType: "",
    otherCollaboration: "",
    gradeLevel: "",
    description: "",
    preferredContact: "" as PreferredContact,
  });

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        fullName: session.user.name || "",
        email: session.user.email || "",
      }));
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.collaborationType) {
      toast.error("Please select a collaboration type.");
      return;
    }

    if (!formData.gradeLevel) {
      toast.error("Please select a grade level.");
      return;
    }

    if (!formData.preferredContact) {
      toast.error("Please select your preferred method of contact.");
      return;
    }

    const description = formData.description.trim();

    setIsSubmitting(true);
    try {
      await createLead({
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        serviceType: "Institution Collaboration",
        requirements: description,
        institutionName: formData.institutionName.trim(),
        positionInInstitution: formData.position.trim(),
        institutionAddress: formData.institutionAddress.trim(),
        collaborationType: formData.collaborationType,
        otherCollaboration:
          formData.collaborationType === "Other"
            ? formData.otherCollaboration.trim()
            : "",
        gradeLevel: formData.gradeLevel,
        preferredContact: formData.preferredContact,
        collaborationDescription: description,
      });

      toast.success("Collaboration request submitted successfully!");

      setFormData({
        fullName: session?.user?.name || "",
        institutionName: "",
        position: "",
        phone: "",
        email: session?.user?.email || "",
        institutionAddress: "",
        collaborationType: "",
        otherCollaboration: "",
        gradeLevel: "",
        description: "",
        preferredContact: "",
      });
    } catch {
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="collaboration"
      className="py-24 bg-foreground/[0.02] relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-border bg-background text-xs font-mono tracking-widest uppercase mb-6">
            Institutional Collaborations
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 leading-[1.05]">
            We are open to partnering with institutions to develop teaching and
            learning materials for schools.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Share your institution&apos;s needs and we&apos;ll work with you to
            build practical, curriculum-aligned material support.
          </p>
        </div>

        <div className="max-w-4xl mx-auto border border-border bg-background p-6 md:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="full-name">Full name</Label>
                <Input
                  id="full-name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="institution-name">
                  Institution/ school name
                </Label>
                <Input
                  id="institution-name"
                  value={formData.institutionName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      institutionName: e.target.value,
                    }))
                  }
                  placeholder="Institution or school"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position in the institution</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      position: e.target.value,
                    }))
                  }
                  placeholder="Principal, Coordinator, Teacher..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="name@institution.edu"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="institution-address">Institution address</Label>
                <Input
                  id="institution-address"
                  value={formData.institutionAddress}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      institutionAddress: e.target.value,
                    }))
                  }
                  placeholder="Full institution address"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>What type of collaboration are you looking for?</Label>
              <Select
                value={formData.collaborationType}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, collaborationType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select collaboration type" />
                </SelectTrigger>
                <SelectContent>
                  {collaborationOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.collaborationType === "Other" && (
                <div className="space-y-2 pt-1">
                  <Label htmlFor="other-collaboration">Other</Label>
                  <Input
                    id="other-collaboration"
                    value={formData.otherCollaboration}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        otherCollaboration: e.target.value,
                      }))
                    }
                    placeholder="Tell us the collaboration type"
                    required
                  />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label>Grade level / classes</Label>
              <Select
                value={formData.gradeLevel}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, gradeLevel: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select grade level / classes" />
                </SelectTrigger>
                <SelectContent>
                  {gradeLevelOptions.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Briefly describe what you are looking for:
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="min-h-[130px]"
                placeholder="Share your goals, timelines, and expected outcomes..."
                required
              />
            </div>

            <div className="space-y-3">
              <Label>Preferred method of contact</Label>
              <Select
                value={formData.preferredContact}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    preferredContact: value as PreferredContact,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select preferred contact" />
                </SelectTrigger>
                <SelectContent>
                  {preferredContactOptions.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full h-11"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </span>
              ) : (
                "Submit Collaboration Request"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
