// This component is a placeholder for the filter logic, which is handled in ProductGrid.
// In a real app, this would be more deeply integrated with the grid state.

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "./ui/card";
import { ListFilter } from "lucide-react";

interface ProductFiltersProps {
    skinTypes: string[];
    skinConcerns: string[];
    categories: string[];
    brands: string[];
}

export function ProductFilters({ skinTypes, skinConcerns, categories, brands }: ProductFiltersProps) {
  return (
    <Card className="sticky top-20 p-4 shadow-sm">
      <h2 className="text-xl font-headline font-semibold mb-4 flex items-center gap-2"><ListFilter className="w-5 h-5"/> Filters</h2>
      <Accordion type="multiple" defaultValue={['category', 'skin-type']} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger className="font-semibold">Category</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {categories.map(c => <span key={c} className="capitalize">{c}</span>)}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="skin-type">
          <AccordionTrigger className="font-semibold">Skin Type</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {skinTypes.map(st => <span key={st} className="capitalize">{st}</span>)}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="skin-concern">
          <AccordionTrigger className="font-semibold">Skin Concern</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {skinConcerns.map(sc => <span key={sc} className="capitalize">{sc}</span>)}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="brand">
          <AccordionTrigger className="font-semibold">Brand</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {brands.map(b => <span key={b}>{b}</span>)}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="text-sm text-muted-foreground mt-4 text-center">
        * Filtering logic is managed in the product grid.
      </div>
    </Card>
  );
}
