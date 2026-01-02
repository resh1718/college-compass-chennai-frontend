import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RotateCcw } from "lucide-react";

export interface FilterState {
  search: string;
  maxDistance: number; // 0-100
  types: {
    government: boolean;
    private: boolean;
  };
  maxFees: number;
  minCutoff: number;
  minRating: number;
  minPlacement: number;
  hostelRequired: boolean;
}

interface FiltersProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  resetFilters: () => void;
}

export function Filters({ filters, setFilters, resetFilters }: FiltersProps) {
  
  const handleTypeChange = (type: 'government' | 'private', checked: boolean) => {
    setFilters({
      ...filters,
      types: { ...filters.types, [type]: checked }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-serif font-bold text-primary">Filters</h2>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2 text-muted-foreground hover:text-foreground">
          <RotateCcw className="w-3.5 h-3.5 mr-1" />
          Reset
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["location", "type", "academic", "facilities"]} className="w-full">
        
        <AccordionItem value="location">
          <AccordionTrigger>Location & Distance</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Distance from Chennai</span>
                <span className="text-muted-foreground">{filters.maxDistance} km</span>
              </div>
              <Slider
                value={[filters.maxDistance]}
                min={0}
                max={100}
                step={5}
                onValueChange={(vals) => setFilters({ ...filters, maxDistance: vals[0] })}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>City Center</span>
                <span>100km+</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="type">
          <AccordionTrigger>Institution Type & Fees</AccordionTrigger>
          <AccordionContent className="space-y-6 pt-2">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="type-gov" 
                  checked={filters.types.government}
                  onCheckedChange={(c) => handleTypeChange('government', c)}
                />
                <Label htmlFor="type-gov">Government</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="type-pvt" 
                  checked={filters.types.private}
                  onCheckedChange={(c) => handleTypeChange('private', c)}
                />
                <Label htmlFor="type-pvt">Private</Label>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Max Annual Fees</span>
                <span className="text-muted-foreground">₹{(filters.maxFees/1000).toFixed(0)}k</span>
              </div>
              <Slider
                value={[filters.maxFees]}
                min={5000}
                max={500000}
                step={5000}
                onValueChange={(vals) => setFilters({ ...filters, maxFees: vals[0] })}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="academic">
          <AccordionTrigger>Academic Eligibility</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Min Cutoff/Marks</span>
                <span className="text-muted-foreground">{filters.minCutoff}</span>
              </div>
              <Slider
                value={[filters.minCutoff]}
                min={0}
                max={200}
                step={1}
                onValueChange={(vals) => setFilters({ ...filters, minCutoff: vals[0] })}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Min Placement %</span>
                <span className="text-muted-foreground">{filters.minPlacement}%</span>
              </div>
              <Slider
                value={[filters.minPlacement]}
                min={0}
                max={100}
                step={5}
                onValueChange={(vals) => setFilters({ ...filters, minPlacement: vals[0] })}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="facilities">
          <AccordionTrigger>Ratings & Facilities</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
             <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Min Overall Rating</span>
                <span className="text-muted-foreground">{filters.minRating} ★</span>
              </div>
              <Slider
                value={[filters.minRating]}
                min={1}
                max={5}
                step={0.1}
                onValueChange={(vals) => setFilters({ ...filters, minRating: vals[0] })}
              />
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Switch 
                id="hostel-req" 
                checked={filters.hostelRequired}
                onCheckedChange={(c) => setFilters({ ...filters, hostelRequired: c })}
              />
              <Label htmlFor="hostel-req">Good Hostel &amp; Food (&gt;3.5★)</Label>
            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  );
}
