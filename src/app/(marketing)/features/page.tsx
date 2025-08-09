import { FeaturesHero } from "@/components/marketing/features/FeaturesHero";
import { ROICalculator } from "@/components/marketing/features/ROICalculator";
import { FeatureCategories } from "@/components/marketing/features/FeatureCategories";
import { CaseStudies } from "@/components/marketing/features/CaseStudies";
import { CompetitiveComparison } from "@/components/marketing/features/CompetitiveComparison";
import { FeaturesCTA } from "@/components/marketing/features/FeaturesCTA";

export default function FeaturesPage() {
  return (
    <>
      <FeaturesHero />
      <ROICalculator />
      <FeatureCategories />
      <CaseStudies />
      <CompetitiveComparison />
      <FeaturesCTA />
    </>
  );
}