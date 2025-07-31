import { createFileRoute } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/authStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  UserIcon,
  CalendarIcon,
  BookOpenIcon,
  StarIcon,
  TrendingUpIcon,
  ClockIcon,
  ArchiveIcon,
  HeartIcon,
  ShareIcon,
  AwardIcon,
  TargetIcon,
  FlameIcon,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/app/profile")({
  component: ProfilePage,
});

function ProfileHeader() {
  const session = useAuthStore((state) => state.session);
  
  // Mock data - in real app, this would come from your API
  const userStats = {
    joinDate: "January 2024",
    articlesRead: 127,
    currentStreak: 8,
    longestStreak: 23,
    totalReadingTime: "45h 32m",
    favoriteArticles: 34,
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Profile Picture */}
          <div className="relative">
            <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <UserIcon className="size-12 text-primary" />
            </div>
            <div className="absolute -bottom-1 -right-1 size-6 rounded-full bg-green-500 border-2 border-background flex items-center justify-center">
              <div className="size-2 rounded-full bg-white" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-1">{session?.user?.name}</h1>
                <p className="text-muted-foreground mb-2">{session?.user?.email}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="size-4" />
                  <span>Joined {userStats.joinDate}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <ShareIcon className="size-4" />
                  Share Profile
                </Button>
                <Button asChild size="sm">
                  <Link to="/app/settings">
                    Edit Profile
                  </Link>
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userStats.articlesRead}</div>
                <div className="text-xs text-muted-foreground">Articles Read</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <FlameIcon className="size-4 text-orange-500" />
                  <span className="text-2xl font-bold text-orange-500">{userStats.currentStreak}</span>
                </div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{userStats.longestStreak}</div>
                <div className="text-xs text-muted-foreground">Best Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{userStats.totalReadingTime}</div>
                <div className="text-xs text-muted-foreground">Reading Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{userStats.favoriteArticles}</div>
                <div className="text-xs text-muted-foreground">Favorites</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">12</div>
                <div className="text-xs text-muted-foreground">Tags Used</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ReadingActivity() {
  // Mock data for reading activity
  const weeklyActivity = [
    { day: "Mon", articles: 3, time: "45m" },
    { day: "Tue", articles: 2, time: "32m" },
    { day: "Wed", articles: 5, time: "78m" },
    { day: "Thu", articles: 1, time: "15m" },
    { day: "Fri", articles: 4, time: "62m" },
    { day: "Sat", articles: 2, time: "28m" },
    { day: "Sun", articles: 6, time: "95m" },
  ];

  const maxArticles = Math.max(...weeklyActivity.map(d => d.articles));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUpIcon className="size-5" />
          This Week's Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {weeklyActivity.map((day, index) => (
            <div key={day.day} className="flex items-center gap-4">
              <div className="w-10 text-sm text-muted-foreground">{day.day}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div 
                    className="bg-primary/20 rounded-full h-2 transition-all"
                    style={{ width: `${(day.articles / maxArticles) * 100}%` }}
                  />
                  <span className="text-sm font-medium">{day.articles} articles</span>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <ClockIcon className="size-3" />
                  {day.time} reading time
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Achievements() {
  const achievements = [
    {
      id: 1,
      title: "First Article",
      description: "Read your first article",
      earned: true,
      earnedDate: "Jan 15, 2024",
      icon: BookOpenIcon,
      color: "text-blue-600"
    },
    {
      id: 2,
      title: "Week Warrior",
      description: "Maintained a 7-day reading streak",
      earned: true,
      earnedDate: "Feb 2, 2024",
      icon: FlameIcon,
      color: "text-orange-500"
    },
    {
      id: 3,
      title: "Century Club",
      description: "Read 100 articles",
      earned: true,
      earnedDate: "Mar 10, 2024",
      icon: AwardIcon,
      color: "text-purple-600"
    },
    {
      id: 4,
      title: "Speed Reader",
      description: "Read 10 articles in a single day",
      earned: false,
      description2: "Progress: 6/10",
      icon: TargetIcon,
      color: "text-gray-400"
    },
    {
      id: 5,
      title: "Knowledge Seeker",
      description: "Read articles from 20 different domains",
      earned: false,
      description2: "Progress: 14/20",
      icon: StarIcon,
      color: "text-gray-400"
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AwardIcon className="size-5" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div 
                key={achievement.id}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                  achievement.earned 
                    ? "bg-accent/50 border-accent" 
                    : "bg-muted/30 border-muted"
                }`}
              >
                <div className={`size-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  achievement.earned ? "bg-accent" : "bg-muted"
                }`}>
                  <Icon className={`size-5 ${achievement.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{achievement.title}</h4>
                    {achievement.earned && (
                      <Badge variant="secondary" className="text-xs">
                        Earned
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {achievement.description}
                  </p>
                  {achievement.earned ? (
                    <p className="text-xs text-muted-foreground">
                      Earned on {achievement.earnedDate}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      {achievement.description2}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function ReadingGoals() {
  const goals = [
    {
      title: "Daily Reading Goal",
      current: 3,
      target: 5,
      unit: "articles",
      color: "bg-blue-500",
    },
    {
      title: "Weekly Time Goal",
      current: 4.2,
      target: 7,
      unit: "hours",
      color: "bg-green-500",
    },
    {
      title: "Monthly Articles",
      current: 47,
      target: 60,
      unit: "articles",
      color: "bg-purple-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TargetIcon className="size-5" />
          Reading Goals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map((goal, index) => {
            const percentage = Math.min((goal.current / goal.target) * 100, 100);
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{goal.title}</span>
                  <span className="text-muted-foreground">
                    {goal.current} / {goal.target} {goal.unit}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${goal.color}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{percentage.toFixed(0)}% complete</span>
                  <span>
                    {goal.target - goal.current > 0 
                      ? `${goal.target - goal.current} ${goal.unit} to go`
                      : "Goal achieved! 🎉"
                    }
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pt-4 border-t mt-6">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Link to="/app/settings" className="flex items-center gap-2">
              <TargetIcon className="size-4" />
              Customize Goals
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function RecentActivity() {
  const recentActivities = [
    {
      type: "read",
      title: "The Future of AI in Healthcare",
      domain: "techcrunch.com",
      timestamp: "2 hours ago",
      icon: BookOpenIcon,
      color: "text-blue-600"
    },
    {
      type: "favorite",
      title: "Understanding React Server Components",
      domain: "vercel.com",
      timestamp: "5 hours ago",
      icon: HeartIcon,
      color: "text-red-500"
    },
    {
      type: "archive",
      title: "10 Tips for Better Code Reviews",
      domain: "github.blog",
      timestamp: "1 day ago",
      icon: ArchiveIcon,
      color: "text-gray-600"
    },
    {
      type: "read",
      title: "The Art of Database Design",
      domain: "planetscale.com",
      timestamp: "2 days ago",
      icon: BookOpenIcon,
      color: "text-blue-600"
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClockIcon className="size-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="flex items-start gap-3">
                <div className="size-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon className={`size-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-1">
                    {activity.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {activity.domain}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function ProfilePage() {
  return (
    <div className="px-4 py-6 space-y-6 max-w-6xl mx-auto">
      <ProfileHeader />
      
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          <ReadingActivity />
          <ReadingGoals />
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          <Achievements />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
