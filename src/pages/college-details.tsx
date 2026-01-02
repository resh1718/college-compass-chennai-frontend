import { Link, useRoute } from "wouter";
import { colleges } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, MapPin, Star, IndianRupee, GraduationCap, 
  Utensils, Home, Briefcase, Calendar, CheckCircle, Share2
} from "lucide-react";
import NotFound from "@/pages/not-found";

export default function CollegeDetails() {
  const [, params] = useRoute("/college/:id");
  const college = colleges.find(c => c.id === params?.id);

  if (!college) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Nav */}
      <div className="border-b bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="pl-0 hover:bg-transparent text-primary hover:text-primary/80">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Search
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={() => navigator.share?.({ title: college.name, url: window.location.href })}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        
        {/* Header Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div className="md:col-span-2 space-y-4">
            <div className="flex gap-2 mb-2">
              <Badge variant={college.type === 'Government' ? 'default' : 'secondary'}>{college.type}</Badge>
              <Badge variant="outline">{college.accreditation}</Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground leading-tight">
              {college.name}
            </h1>
            <div className="flex items-center text-muted-foreground text-lg">
              <MapPin className="w-5 h-5 mr-2 text-primary" />
              {college.location} {college.distanceFromChennai > 0 && `• ${college.distanceFromChennai} km from Chennai`}
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground pt-4">
              {college.description}
            </p>
          </div>
          <div className="h-64 md:h-auto rounded-xl overflow-hidden shadow-lg">
            <img src={college.image} alt={college.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-card p-5 rounded-lg border shadow-sm text-center md:text-left">
            <div className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-1 flex items-center justify-center md:justify-start">
              <Star className="w-3 h-3 mr-1" /> Rating
            </div>
            <div className="text-3xl font-bold text-primary">{college.rating}</div>
            <div className="text-xs text-muted-foreground mt-1">out of 5.0</div>
          </div>
          <div className="bg-card p-5 rounded-lg border shadow-sm text-center md:text-left">
            <div className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-1 flex items-center justify-center md:justify-start">
              <IndianRupee className="w-3 h-3 mr-1" /> Annual Fees
            </div>
            <div className="text-3xl font-bold text-primary">₹{(college.fees/1000).toFixed(0)}k</div>
            <div className="text-xs text-muted-foreground mt-1">Approximate</div>
          </div>
          <div className="bg-card p-5 rounded-lg border shadow-sm text-center md:text-left">
            <div className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-1 flex items-center justify-center md:justify-start">
              <GraduationCap className="w-3 h-3 mr-1" /> Cutoff
            </div>
            <div className="text-3xl font-bold text-primary">{college.cutoff}</div>
            <div className="text-xs text-muted-foreground mt-1">Average Eligibility</div>
          </div>
          <div className="bg-card p-5 rounded-lg border shadow-sm text-center md:text-left">
            <div className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-1 flex items-center justify-center md:justify-start">
              <Calendar className="w-3 h-3 mr-1" /> Estd.
            </div>
            <div className="text-3xl font-bold text-primary">{college.established}</div>
            <div className="text-xs text-muted-foreground mt-1">Legacy</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Courses */}
            <section className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-2xl font-serif font-bold mb-4 flex items-center">
                <Briefcase className="w-6 h-6 mr-3 text-primary" />
                Available Courses
              </h2>
              <div className="flex flex-wrap gap-2">
                {college.courses.map((course) => (
                  <div key={course} className="bg-muted text-foreground px-4 py-2 rounded-md font-medium flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    {course}
                  </div>
                ))}
              </div>
            </section>

             {/* Facilities Breakdown */}
             <section className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-2xl font-serif font-bold mb-6 flex items-center">
                <Home className="w-6 h-6 mr-3 text-primary" />
                Campus Life
              </h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium flex items-center"><Home className="w-4 h-4 mr-2 text-muted-foreground"/> Hostel Facilities</span>
                    <span className="font-bold">{college.hostelRating}/5.0</span>
                  </div>
                  <Progress value={(college.hostelRating / 5) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium flex items-center"><Utensils className="w-4 h-4 mr-2 text-muted-foreground"/> Food & Canteen</span>
                    <span className="font-bold">{college.foodRating}/5.0</span>
                  </div>
                  <Progress value={(college.foodRating / 5) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium flex items-center"><Briefcase className="w-4 h-4 mr-2 text-muted-foreground"/> Placement Record</span>
                    <span className="font-bold">{college.placementRate}%</span>
                  </div>
                  <Progress value={college.placementRate} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {college.placementRate > 90 ? "Excellent placement record with top tier companies." : "Good placement support provided."}
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar CTA */}
          <div className="space-y-6">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-2">Interested in this college?</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Check their official website for the latest admission dates and brochure.
              </p>
              <Button className="w-full mb-3" size="lg">
                Visit Official Website
              </Button>
              <Button variant="outline" className="w-full">
                Download Brochure
              </Button>
              <Separator className="my-4" />
              <div className="text-xs text-muted-foreground text-center">
                Admissions usually open in May-June.
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
