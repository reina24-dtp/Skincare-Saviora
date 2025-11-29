"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "./ui/card";
import { ListFilter, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

interface ProductFiltersProps {
    skinTypes: string[];
    skinConcerns: string[];
    categories: string[];
    brands: string[];
    filters: {
        search: string;
        categories: string[];
        skinTypes: string[];
        skinConcerns: string[];
        brands: string[];
    };
    onFilterChange: (filterType: keyof ProductFiltersProps['filters'], value: string | string[]) => void;
}

export function ProductFilters({ skinTypes, skinConcerns, categories, brands, filters, onFilterChange }: ProductFiltersProps) {

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange('search', e.target.value);
  };
  
  const handleCheckboxChange = (filterType: 'categories' | 'skinTypes' | 'skinConcerns' | 'brands', value: string) => {
    const currentValues = filters[filterType];
    const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
    onFilterChange(filterType, newValues);
  }

  return (
    <Card className="sticky top-20 p-4 shadow-sm">
      <h2 className="text-xl font-headline font-semibold mb-4 flex items-center gap-2"><ListFilter className="w-5 h-5"/> Filter</h2>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
        <Input 
            placeholder="Cari produk..." 
            className="pl-9"
            value={filters.search}
            onChange={handleSearchChange}
        />
      </div>

      <Accordion type="multiple" defaultValue={['category']} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger className="font-semibold">Kategori</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {categories.map(c => (
                <div key={c} className="flex items-center space-x-2">
                    <Checkbox id={`cat-${c}`} onCheckedChange={() => handleCheckboxChange('categories', c)} checked={filters.categories.includes(c)} />
                    <Label htmlFor={`cat-${c}`} className="capitalize font-normal cursor-pointer">{c}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="skin-type">
          <AccordionTrigger className="font-semibold">Jenis Kulit</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {skinTypes.map(st => (
                 <div key={st} className="flex items-center space-x-2">
                    <Checkbox id={`st-${st}`} onCheckedChange={() => handleCheckboxChange('skinTypes', st)} checked={filters.skinTypes.includes(st)} />
                    <Label htmlFor={`st-${st}`} className="capitalize font-normal cursor-pointer">{st}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="skin-concern">
          <AccordionTrigger className="font-semibold">Masalah Kulit</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {skinConcerns.map(sc => (
                 <div key={sc} className="flex items-center space-x-2">
                    <Checkbox id={`sc-${sc}`} onCheckedChange={() => handleCheckboxChange('skinConcerns', sc)} checked={filters.skinConcerns.includes(sc)} />
                    <Label htmlFor={`sc-${sc}`} className="capitalize font-normal cursor-pointer">{sc}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="brand">
          <AccordionTrigger className="font-semibold">Merek</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {brands.map(b => (
                 <div key={b} className="flex items-center space-x-2">
                    <Checkbox id={`brand-${b}`} onCheckedChange={() => handleCheckboxChange('brands', b)} checked={filters.brands.includes(b)} />
                    <Label htmlFor={`brand-${b}`} className="font-normal cursor-pointer">{b}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
