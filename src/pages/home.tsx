import { useState, useMemo } from "react";
import { colleges } from "@/lib/mock-data";
import { CollegeCard } from "@/components/college-card";
import { Filters, FilterState } from "@/components/filters";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

// ✅ FIXED IMAGE IMPORT
import heroImage from "@/assets/generated_images/modern_university_campus_chennai.png";

const INITIAL_FILTERS: FilterState = {
  search: "",
  maxDistance: 100,
  types: {
    government: true,
    private: true,
  },
  maxFees: 500000,
  minCutoff: 0,
  minRating: 0,
  minPlacement: 0,
  hostelRequired: false,
};

export default function Home() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        college.name.toLowerCase().includes(searchLower) ||
        college.courses.some((c) => c.toLowerCase().includes(searchLower)) ||
        college.location.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;
      if (college.distanceFromChennai > filters.maxDistance) return false;
      if (college.type === "Government" && !filters.types.government) return false;
      if (college.type === "Private" && !filters.types.private) return false;
      if (college.fees > filters.maxFees) return false;
      if (college.cutoff < filters.minCutoff) return false;
      if (college.rating < filters.minRating) return false;
      if (college.placementRate < filters.minPlacement) return false;

      if (
        filters.hostelRequired &&
        (college.hostelRating < 3.5 || college.foodRating < 3.5)
      )
        return false;

      return true;
    });
  }, [filters]);

  const resetFilters = () => setFilters(INITIAL_FILTERS);

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Hero Section */}
      <div className="relative bg-primary text-primary-foreground py-16 px-4 md:py-24">
        <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
          <img
            src={heroImage}
            className="w-full h-full object-cover"
            alt="campus"
          />
        </div>

        <div className="container mx-auto relative z-10 text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 tracking-tight">
            Find Your Future in Chennai
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto font-light">
            Discover the best Government and Private colleges tailored to your
            marks, budget, and career goals.
          </p>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              className="pl-10 h-12 text-base bg-white/95 text-foreground border-0 shadow-lg placeholder:text-muted-foreground/70"
              placeholder="Search by college name, course, or location..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-72 shrink-0 space-y-6">
            <div className="sticky top-6">
              <Filters
                filters={filters}
                setFilters={setFilters}
                resetFilters={resetFilters}
              />
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-bold text-foreground">
                Showing {filteredColleges.length} Colleges
              </h2>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto">
                  <Filters
                    filters={filters}
                    setFilters={setFilters}
                    resetFilters={resetFilters}
                  />
                </SheetContent>
              </Sheet>
            </div>

            {filteredColleges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredColleges.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-card rounded-lg border border-dashed">
                <div className="text-4xl mb-4">🏫</div>
                <h3 className="text-xl font-bold mb-2">No colleges found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search terms to find more results.
                </p>
                <Button onClick={resetFilters}>Clear All Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
