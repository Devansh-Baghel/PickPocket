import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useThemeStore, themes } from "@/stores/themeStore";
import { useFontStore, fontFamilies } from "@/stores/fontStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  SettingsIcon,
  PaletteIcon,
  TypeIcon,
  BellIcon,
  ShieldIcon,
  DatabaseIcon,
  UserIcon,
  SaveIcon,
  DownloadIcon,
  TrashIcon,
  EyeIcon,
  EyeOffIcon,
  CheckIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/app/settings")({
  component: SettingsPage,
});

function ThemeSection() {
  const { theme: currentTheme, setTheme } = useThemeStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <PaletteIcon className="size-5" />
          Appearance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium mb-3 block">Theme</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {themes.map((themeOption) => (
              <div
                key={themeOption.key}
                className={`${themeOption.key} relative cursor-pointer rounded-lg border-2 p-3 transition-all hover:scale-105 bg-background text-foreground ${
                  currentTheme === themeOption.key
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setTheme(themeOption.key)}
              >
                {currentTheme === themeOption.key && (
                  <div className="absolute -top-2 -right-2 size-5 rounded-full bg-primary flex items-center justify-center">
                    <CheckIcon className="size-3 text-primary-foreground" />
                  </div>
                )}
                <div className="text-center">
                  <div className="text-sm font-medium mb-2">{themeOption.name}</div>
                  <div className="flex justify-center gap-1">
                    <div className="size-3 rounded-full bg-primary border border-gray-300" />
                    <div className="size-3 rounded-full bg-secondary border border-gray-300" />
                    <div className="size-3 rounded-full bg-accent border border-gray-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FontSection() {
  const { font: currentFont, setFont } = useFontStore();

  const fonts = [
    { key: "Alexandria" as const, name: "Alexandria" },
    { key: "Geist" as const, name: "Geist" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TypeIcon className="size-5" />
          Typography
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium mb-3 block">UI Font</Label>
          <div className="grid gap-3 sm:grid-cols-2">
            {fonts.map((fontOption) => (
              <div
                key={fontOption.key}
                className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:scale-[1.02] bg-background text-foreground ${
                  currentFont === fontOption.key
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setFont(fontOption.key)}
              >
                {currentFont === fontOption.key && (
                  <div className="absolute -top-2 -right-2 size-5 rounded-full bg-primary flex items-center justify-center">
                    <CheckIcon className="size-3 text-primary-foreground" />
                  </div>
                )}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm" style={{ fontFamily: fontFamilies[fontOption.key] }}>
                    {fontOption.name}
                  </h4>
                  <p className="text-sm text-muted-foreground" style={{ fontFamily: fontFamilies[fontOption.key] }}>
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ReadingPreferencesSection() {
  const [preferences, setPreferences] = useState({
    autoArchive: true,
    emailNotifications: false,
    readingReminders: true,
    showReadingProgress: true,
    compactView: false,
    showExcerpts: true,
  });

  const handlePreferenceChange = (key: keyof typeof preferences, checked: boolean) => {
    setPreferences((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <SettingsIcon className="size-5" />
          Reading Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="auto-archive"
              checked={preferences.autoArchive}
              onCheckedChange={(checked) => handlePreferenceChange("autoArchive", checked as boolean)}
              className="mt-0.5"
            />
            <div className="grid gap-1.5 leading-none flex-1">
              <Label htmlFor="auto-archive" className="text-sm font-medium">
                Auto-archive read articles
              </Label>
              <p className="text-xs text-muted-foreground">
                Automatically move articles to archive after reading
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="reading-progress"
              checked={preferences.showReadingProgress}
              onCheckedChange={(checked) => handlePreferenceChange("showReadingProgress", checked as boolean)}
              className="mt-0.5"
            />
            <div className="grid gap-1.5 leading-none flex-1">
              <Label htmlFor="reading-progress" className="text-sm font-medium">
                Show reading progress
              </Label>
              <p className="text-xs text-muted-foreground">
                Display progress bar while reading articles
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="compact-view"
              checked={preferences.compactView}
              onCheckedChange={(checked) => handlePreferenceChange("compactView", checked as boolean)}
              className="mt-0.5"
            />
            <div className="grid gap-1.5 leading-none flex-1">
              <Label htmlFor="compact-view" className="text-sm font-medium">
                Compact list view
              </Label>
              <p className="text-xs text-muted-foreground">
                Show more articles in less space
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="show-excerpts"
              checked={preferences.showExcerpts}
              onCheckedChange={(checked) => handlePreferenceChange("showExcerpts", checked as boolean)}
              className="mt-0.5"
            />
            <div className="grid gap-1.5 leading-none flex-1">
              <Label htmlFor="show-excerpts" className="text-sm font-medium">
                Show article excerpts
              </Label>
              <p className="text-xs text-muted-foreground">
                Display preview text for saved articles
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button size="sm">
            <SaveIcon className="size-4" />
            Save Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function NotificationSection() {
  const [notifications, setNotifications] = useState({
    emailDigest: false,
    readingReminders: true,
    newFeatures: true,
    weeklyStats: false,
  });

  const handleNotificationChange = (key: keyof typeof notifications, checked: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BellIcon className="size-5" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="email-digest"
              checked={notifications.emailDigest}
              onCheckedChange={(checked) => handleNotificationChange("emailDigest", checked as boolean)}
              className="mt-0.5"
            />
            <div className="grid gap-1.5 leading-none flex-1">
              <Label htmlFor="email-digest" className="text-sm font-medium">
                Weekly email digest
              </Label>
              <p className="text-xs text-muted-foreground">
                Receive weekly summary of your reading activity
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="reading-reminders"
              checked={notifications.readingReminders}
              onCheckedChange={(checked) => handleNotificationChange("readingReminders", checked as boolean)}
              className="mt-0.5"
            />
            <div className="grid gap-1.5 leading-none flex-1">
              <Label htmlFor="reading-reminders" className="text-sm font-medium">
                Daily reading reminders
              </Label>
              <p className="text-xs text-muted-foreground">
                Get notified to maintain your reading streak
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="new-features"
              checked={notifications.newFeatures}
              onCheckedChange={(checked) => handleNotificationChange("newFeatures", checked as boolean)}
              className="mt-0.5"
            />
            <div className="grid gap-1.5 leading-none flex-1">
              <Label htmlFor="new-features" className="text-sm font-medium">
                New features & updates
              </Label>
              <p className="text-xs text-muted-foreground">
                Be notified when we release new features
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="weekly-stats"
              checked={notifications.weeklyStats}
              onCheckedChange={(checked) => handleNotificationChange("weeklyStats", checked as boolean)}
              className="mt-0.5"
            />
            <div className="grid gap-1.5 leading-none flex-1">
              <Label htmlFor="weekly-stats" className="text-sm font-medium">
                Weekly reading stats
              </Label>
              <p className="text-xs text-muted-foreground">
                Get insights about your reading habits
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button size="sm">
            <SaveIcon className="size-4" />
            Save Notification Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function PrivacySection() {
  const [privacy, setPrivacy] = useState({
    profileVisibility: "private",
    shareReadingStats: false,
    allowDataCollection: true,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShieldIcon className="size-5" />
          Privacy & Security
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Profile Visibility</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto justify-between">
                  {privacy.profileVisibility === "private" ? "Private" : "Public"}
                  <EyeIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setPrivacy(prev => ({ ...prev, profileVisibility: "private" }))}>
                  <EyeOffIcon className="size-4" />
                  Private
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPrivacy(prev => ({ ...prev, profileVisibility: "public" }))}>
                  <EyeIcon className="size-4" />
                  Public
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <p className="text-xs text-muted-foreground mt-1">
              Control who can see your reading activity
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="share-stats"
              checked={privacy.shareReadingStats}
              onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, shareReadingStats: checked as boolean }))}
              className="mt-0.5"
            />
            <div className="grid gap-1.5 leading-none flex-1">
              <Label htmlFor="share-stats" className="text-sm font-medium">
                Share anonymous reading statistics
              </Label>
              <p className="text-xs text-muted-foreground">
                Help improve PickPocket by sharing anonymized usage data
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="data-collection"
              checked={privacy.allowDataCollection}
              onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, allowDataCollection: checked as boolean }))}
              className="mt-0.5"
            />
            <div className="grid gap-1.5 leading-none flex-1">
              <Label htmlFor="data-collection" className="text-sm font-medium">
                Allow analytics and performance monitoring
              </Label>
              <p className="text-xs text-muted-foreground">
                Help us improve performance and fix bugs
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button size="sm">
            <SaveIcon className="size-4" />
            Save Privacy Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function DataManagementSection() {
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <DatabaseIcon className="size-5" />
          Data Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Export Your Data</h4>
              <p className="text-sm text-muted-foreground">
                Download all your saved articles, highlights, and reading history
              </p>
            </div>
            <Button variant="outline">
              <DownloadIcon className="size-4" />
              Export Data
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Import from Pocket</h4>
              <p className="text-sm text-muted-foreground">
                Import your existing saves from Mozilla Pocket
              </p>
            </div>
            <Button variant="outline">
              <DownloadIcon className="size-4" />
              Import Data
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-red-200 rounded-lg dark:bg-red-950/20 dark:border-red-800">
            <div>
              <h4 className="font-medium text-red-900 dark:text-red-100">Delete Account</h4>
              <p className="text-sm text-red-700 dark:text-red-300">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button variant="destructive">
              <TrashIcon className="size-4" />
              Delete Account
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AccountSection() {
  const session = useAuthStore((state) => state.session);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <UserIcon className="size-5" />
          Account Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <UserIcon className="size-8 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setIsEditing(false)}>
                    <SaveIcon className="size-4" />
                    Save Changes
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{session?.user?.name}</h3>
                <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
                <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SettingsPage() {
  return (
    <div className="px-4 py-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account, preferences, and application settings.
        </p>
      </div>

      {/* Settings Sections */}
      <div className="grid gap-6">
        {/* Account & Appearance - Top Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <AccountSection />
          <ThemeSection />
        </div>

        {/* Font & Reading Preferences */}
        <div className="grid gap-6 lg:grid-cols-2">
          <FontSection />
          <ReadingPreferencesSection />
        </div>

        {/* Notifications & Privacy */}
        <div className="grid gap-6 lg:grid-cols-2">
          <NotificationSection />
          <PrivacySection />
        </div>

        {/* Data Management - Full Width */}
        <DataManagementSection />
      </div>
    </div>
  );
}
