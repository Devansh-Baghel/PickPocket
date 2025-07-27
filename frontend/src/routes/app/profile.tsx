import { createFileRoute } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/authStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  UserIcon,
  MailIcon,
  CalendarIcon,
  BookmarkIcon,
  TrendingUpIcon,
  ClockIcon,
  ArchiveIcon,
  HeartIcon,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { session } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
  });

  // Preferences state
  const [preferences, setPreferences] = useState({
    autoArchive: true,
    emailNotifications: false,
    readingReminders: true,
  });

  // Mock data - in real app, these would come from API calls
  const profileStats = {
    totalSaves: 247,
    articlesRead: 189,
    favorites: 34,
    archived: 78,
    avgReadingTime: "12 min",
    joinDate: "March 2024",
    readingStreak: 7,
    thisWeekReads: 14,
  };

  const handleSave = () => {
    // TODO: Implement profile update API call
    console.log("Saving profile:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: session?.user?.name || "",
      email: session?.user?.email || "",
    });
    setIsEditing(false);
  };

  const handlePreferenceChange = (
    key: keyof typeof preferences,
    checked: boolean
  ) => {
    setPreferences((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <div className="px-4 py-6 space-y-6 max-w-4xl mx-auto">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <UserIcon className="size-5" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <UserIcon className="size-8 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              {!isEditing ? (
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold truncate">
                    {session?.user?.name}
                  </h2>
                  <p className="text-muted-foreground flex items-center gap-2 text-sm">
                    <MailIcon className="size-4 flex-shrink-0" />
                    <span className="truncate">{session?.user?.email}</span>
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <CalendarIcon className="size-4 flex-shrink-0" />
                    Member since {profileStats.joinDate}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="name" className="text-sm">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter your full name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Enter your email"
                      className="mt-1"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              {!isEditing ? (
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto"
                >
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="w-full sm:w-auto">
                    Save Changes
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reading Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUpIcon className="size-5" />
            Reading Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 rounded-lg bg-accent">
              <BookmarkIcon className="size-5 sm:size-6 mx-auto mb-2 text-primary" />
              <div className="text-lg sm:text-2xl font-bold">
                {profileStats.totalSaves}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Total Saves
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-accent">
              <ClockIcon className="size-5 sm:size-6 mx-auto mb-2 text-secondary" />
              <div className="text-lg sm:text-2xl font-bold">
                {profileStats.articlesRead}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Articles Read
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-accent">
              <HeartIcon className="size-5 sm:size-6 mx-auto mb-2 text-red-500" />
              <div className="text-lg sm:text-2xl font-bold">
                {profileStats.favorites}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Favorited
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-accent">
              <ArchiveIcon className="size-5 sm:size-6 mx-auto mb-2 text-base-600" />
              <div className="text-lg sm:text-2xl font-bold">
                {profileStats.archived}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Archived
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reading Habits */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reading Habits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Average Reading Time
              </span>
              <span className="font-semibold">
                {profileStats.avgReadingTime}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Current Streak
              </span>
              <span className="font-semibold">
                {profileStats.readingStreak} days
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">This Week</span>
              <span className="font-semibold">
                {profileStats.thisWeekReads} articles
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reading Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="auto-archive"
                  checked={preferences.autoArchive}
                  onCheckedChange={(checked) =>
                    handlePreferenceChange("autoArchive", checked as boolean)
                  }
                  className="mt-0.5"
                />
                <div className="grid gap-1.5 leading-none flex-1">
                  <Label
                    htmlFor="auto-archive"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Auto-archive read articles
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically move articles to archive after reading
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="email-notifications"
                  checked={preferences.emailNotifications}
                  onCheckedChange={(checked) =>
                    handlePreferenceChange(
                      "emailNotifications",
                      checked as boolean
                    )
                  }
                  className="mt-0.5"
                />
                <div className="grid gap-1.5 leading-none flex-1">
                  <Label
                    htmlFor="email-notifications"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Email notifications
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Receive weekly reading digest and updates
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="reading-reminders"
                  checked={preferences.readingReminders}
                  onCheckedChange={(checked) =>
                    handlePreferenceChange(
                      "readingReminders",
                      checked as boolean
                    )
                  }
                  className="mt-0.5"
                />
                <div className="grid gap-1.5 leading-none flex-1">
                  <Label
                    htmlFor="reading-reminders"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Daily reading reminders
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Get notified to maintain your reading streak
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Account Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <Button variant="outline" className="w-full">
              Export My Data
            </Button>
            <Button variant="outline" className="w-full">
              Download History
            </Button>
            <Button variant="destructive" className="w-full">
              Delete Account
            </Button>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Export includes all your saved articles, highlights, and reading
            statistics. Account deletion is permanent and cannot be undone.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
