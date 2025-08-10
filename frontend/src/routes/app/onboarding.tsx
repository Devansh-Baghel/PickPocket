import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImportPocket } from "@/components/ImportPocket";
import { ThemeSelector } from "@/components/ThemeToggle";
import { FontSelector } from "@/components/FontToggle";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  SparklesIcon,
  ImportIcon,
  PaletteIcon,
  TypeIcon,
  BookmarkIcon,
  ArrowRightIcon,
  XIcon,
} from "lucide-react";
import { PocketIcon } from "@/utils/icons";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/app/onboarding")({
  component: OnboardingPage,
});

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType;
  optional?: boolean;
}

function WelcomeStep() {
  return (
    <div className="space-y-6 py-8 text-center">
      <div className="flex justify-center">
        <div className="relative">
          <PocketIcon className="size-20 text-primary" />
          <div className="absolute -top-2 -right-2 flex size-8 items-center justify-center rounded-full bg-primary/10">
            <SparklesIcon className="size-5 text-primary" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Welcome to PickPocket!</h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          A read-it-later app that doesn't suck. Let's get you set up with
          everything you need for the perfect reading experience.
        </p>
      </div>

      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col items-center gap-2 rounded-lg bg-accent/50 p-4">
          <BookmarkIcon className="size-8 text-primary" />
          <h3 className="font-semibold">Save Articles</h3>
          <p className="text-center text-sm text-muted-foreground">
            Save from any website
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 rounded-lg bg-accent/50 p-4">
          <PaletteIcon className="size-8 text-primary" />
          <h3 className="font-semibold">Beautiful Themes</h3>
          <p className="text-center text-sm text-muted-foreground">
            15+ customizable themes
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 rounded-lg bg-accent/50 p-4">
          <ImportIcon className="size-8 text-primary" />
          <h3 className="font-semibold">Import Data</h3>
          <p className="text-center text-sm text-muted-foreground">
            Bring your Pocket saves
          </p>
        </div>
      </div>
    </div>
  );
}

function ImportStep() {
  return (
    <div className="space-y-6">
      <div className="space-y-4 text-center">
        <ImportIcon className="mx-auto size-16 text-primary" />
        <div>
          <h2 className="mb-2 text-2xl font-bold">Import Your Saves</h2>
          <p className="text-muted-foreground">
            Already using Pocket? Import all your saved articles with a simple
            CSV upload.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl">
        <ImportPocket />
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don't have Pocket saves? No problem! You can skip this step and start
          saving articles right away.
        </p>
      </div>
    </div>
  );
}

function AppearanceStep() {
  return (
    <div className="space-y-8">
      <div className="space-y-4 text-center">
        <PaletteIcon className="mx-auto size-16 text-primary" />
        <div>
          <h2 className="mb-2 text-2xl font-bold">Customize Your Experience</h2>
          <p className="text-muted-foreground">
            Choose your preferred theme and font to make PickPocket truly yours.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <ThemeSelector />
        <FontSelector />
      </div>
    </div>
  );
}

function CompleteStep() {
  return (
    <div className="space-y-6 py-8 text-center">
      <div className="flex justify-center">
        <div className="relative">
          <div className="flex size-20 items-center justify-center rounded-full bg-green-500/10">
            <CheckIcon className="size-12 text-green-600" />
          </div>
          <div className="absolute -top-2 -right-2 flex size-8 items-center justify-center rounded-full bg-green-500">
            <SparklesIcon className="size-5 text-white" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-bold">You're All Set!</h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Welcome to PickPocket! You can now start saving articles and enjoying
          a distraction-free reading experience.
        </p>
      </div>

      <div className="mx-auto max-w-2xl rounded-lg bg-accent/50 p-6">
        <h3 className="mb-3 font-semibold">Quick Tips to Get Started:</h3>
        <ul className="space-y-2 text-left text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckIcon className="mt-0.5 size-4 flex-shrink-0 text-green-600" />
            <span>
              Save articles by pasting URLs or using our browser extension
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckIcon className="mt-0.5 size-4 flex-shrink-0 text-green-600" />
            <span>Organize with favorites, archives, and highlights</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckIcon className="mt-0.5 size-4 flex-shrink-0 text-green-600" />
            <span>Customize themes and fonts anytime in settings</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckIcon className="mt-0.5 size-4 flex-shrink-0 text-green-600" />
            <span>Search through all your saved content instantly</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Welcome",
    description: "Get started with PickPocket",
    icon: SparklesIcon,
    component: WelcomeStep,
  },
  {
    id: "import",
    title: "Import",
    description: "Bring your Pocket saves",
    icon: ImportIcon,
    component: ImportStep,
    optional: true,
  },
  {
    id: "appearance",
    title: "Appearance",
    description: "Customize your experience",
    icon: PaletteIcon,
    component: AppearanceStep,
    optional: true,
  },
  {
    id: "complete",
    title: "Complete",
    description: "You're ready to go!",
    icon: CheckIcon,
    component: CompleteStep,
  },
];

interface OnboardingFlowProps {
  onComplete?: () => void;
  onSkip?: () => void;
}

function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const step = ONBOARDING_STEPS[currentStep];
  const StepComponent = step.component;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete?.();
    } else {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
      setCurrentStep((prev) => Math.min(prev + 1, ONBOARDING_STEPS.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSkipStep = () => {
    if (step.optional) {
      handleNext();
    }
  };

  const handleSkipOnboarding = () => {
    onSkip?.();
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-lg font-semibold">Setup Your Account</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkipOnboarding}
              className="text-muted-foreground hover:text-foreground"
            >
              <XIcon className="mr-2 size-4" />
              Skip Setup
            </Button>
          </div>

          <div className="mb-2 flex items-center gap-2">
            {ONBOARDING_STEPS.map((s, index) => {
              const Icon = s.icon;
              const isActive = index === currentStep;
              const isCompleted =
                completedSteps.has(index) || index < currentStep;

              return (
                <div key={s.id} className="flex items-center">
                  <button
                    onClick={() => goToStep(index)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : isCompleted
                          ? "bg-green-500/10 text-green-600 hover:bg-green-500/20"
                          : "bg-muted text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {isCompleted && !isActive ? (
                      <CheckIcon className="size-4" />
                    ) : (
                      <Icon className="size-4" />
                    )}
                    <span className="hidden text-sm font-medium sm:inline">
                      {s.title}
                    </span>
                    {s.optional && (
                      <Badge
                        variant="outline"
                        className="ml-1 hidden text-xs md:inline"
                      >
                        Optional
                      </Badge>
                    )}
                  </button>

                  {index < ONBOARDING_STEPS.length - 1 && (
                    <ChevronRightIcon className="mx-2 size-4 text-muted-foreground" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="h-2 w-full rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary transition-all duration-300"
              style={{
                width: `${((currentStep + 1) / ONBOARDING_STEPS.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="min-h-[500px]">
          <CardHeader className="pb-4 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <step.icon className="size-6 text-primary" />
              <CardTitle className="text-xl">{step.title}</CardTitle>
              {step.optional && (
                <Badge variant="outline" className="text-xs">
                  Optional
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">{step.description}</p>
          </CardHeader>

          <CardContent>
            <StepComponent />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirstStep}
            className="flex items-center gap-2"
          >
            <ChevronLeftIcon className="size-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {step.optional && !isLastStep && (
              <Button
                variant="ghost"
                onClick={handleSkipStep}
                className="text-muted-foreground"
              >
                Skip this step
              </Button>
            )}

            <Button onClick={handleNext} className="flex items-center gap-2">
              {isLastStep ? (
                <>
                  Get Started
                  <ArrowRightIcon className="size-4" />
                </>
              ) : (
                <>
                  Next
                  <ChevronRightIcon className="size-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OnboardingPage() {
  const navigate = useNavigate();

  const handleComplete = () => {
    // Navigate to main app after completion
    navigate({ to: "/app" });
  };

  const handleSkip = () => {
    // Navigate to main app if skipped
    navigate({ to: "/app" });
  };

  return <OnboardingFlow onComplete={handleComplete} onSkip={handleSkip} />;
}
