import { Link } from "wouter";
import { College } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MapPin, IndianRupee, Star, GraduationCap, Utensils, Home } from "lucide-react";

interface CollegeCardProps {
  college: College;
}

export function CollegeCard({ college }: CollegeCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden border-border/60">
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={college.image} 
          alt={college.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge variant={college.type === 'Government' ? "default" : "secondary"} className="shadow-sm">
            {college.type}
          </Badge>
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm shadow-sm">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
            {college.rating}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="text-xl font-serif font-bold leading-tight text-primary line-clamp-2 min-h-[3.5rem]">
          {college.name}
        </h3>
        <div className="flex items-center text-muted-foreground text-sm mt-1">
          <MapPin className="w-4 h-4 mr-1 shrink-0" />
          <span className="truncate">{college.location} {college.distanceFromChennai > 0 && `(${college.distanceFromChennai} km)`}</span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow py-2">
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mb-4">
          <div className="flex items-center text-muted-foreground">
            <IndianRupee className="w-4 h-4 mr-2 text-primary/70" />
            <span>₹{(college.fees / 1000).toFixed(0)}k / yr</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <GraduationCap className="w-4 h-4 mr-2 text-primary/70" />
            <span>Cutoff: {college.cutoff}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Home className="w-4 h-4 mr-2 text-primary/70" />
            <span>Hostel: {college.hostelRating}/5</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Utensils className="w-4 h-4 mr-2 text-primary/70" />
            <span>Food: {college.foodRating}/5</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {college.courses.slice(0, 3).map((course, i) => (
            <span key={i} className="text-[10px] px-2 py-1 bg-muted rounded-full text-muted-foreground">
              {course}
            </span>
          ))}
          {college.courses.length > 3 && (
            <span className="text-[10px] px-2 py-1 bg-muted rounded-full text-muted-foreground">
              +{college.courses.length - 3} more
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 border-t bg-muted/20">
        <Link href={`/college/${college.id}`} className="w-full">
          <Button className="w-full font-medium group">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
