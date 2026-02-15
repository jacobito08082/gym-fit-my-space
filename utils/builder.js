// utils/builder.js
import { products } from '../data/products';

export function buildGym(ceilingHeight, selectedCategories, liftStyle, brandPreference) {
  
  const tiers = {
    budget: { items: [], total: 0, name: "Starter Setup" },
    value: { items: [], total: 0, name: "Best Bang for Buck" },
    premium: { items: [], total: 0, name: "Dream Gym" }
  };

  Object.keys(tiers).forEach(tierKey => {
    let currentTotal = 0;
    
    selectedCategories.forEach(category => {
      const categoryProducts = products[category];
      if (!categoryProducts || categoryProducts.length === 0) return;

      let validProducts = categoryProducts;

      // --- FILTER 1: CEILING HEIGHT (Safety) ---
      if (category === 'racks') {
        validProducts = validProducts.filter(p => p.height < (ceilingHeight - 2));
      }

      // --- FILTER 2: BRAND PREFERENCE (Loyalty) ---
      if (brandPreference !== 'any') {
        const brandMatches = validProducts.filter(p => p.brand === brandPreference);
        // Only enforce brand if that brand actually makes this product!
        // Otherwise fallback to other brands so the list isn't empty.
        if (brandMatches.length > 0) {
          validProducts = brandMatches;
        }
      }

      // --- FILTER 3: TRAINING STYLE (Plates Logic) ---
      if (category === 'plates') {
        if (liftStyle === 'crossfit' || liftStyle === 'olympic') {
          // Force Bumpers (Safety requirement for dropping)
          validProducts = validProducts.filter(p => p.style === 'crossfit');
        } else if (liftStyle === 'powerlifting') {
          // Prefer Iron (Cost effective for heavy weight)
          // But allow 'mixed' if iron isn't available
          const ironOptions = validProducts.filter(p => p.style === 'powerlifting');
          if (ironOptions.length > 0) validProducts = ironOptions;
        }
      }

      // --- SELECTION: PICK ITEM BY TIER ---
      let selectedProduct = validProducts.find(p => p.tier === tierKey);
      
      // Fallback Logic: If "Premium" doesn't exist, try "Value"
      if (!selectedProduct && tierKey === 'premium') {
        selectedProduct = validProducts.find(p => p.tier === 'value');
      }
      // Fallback Logic: If "Budget" doesn't exist, try "Value"
      if (!selectedProduct && tierKey === 'budget') {
        selectedProduct = validProducts.find(p => p.tier === 'value');
      }
      // Ultimate Fallback: Just take the first valid one
      if (!selectedProduct) {
        selectedProduct = validProducts[0];
      }

      if (selectedProduct) {
        tiers[tierKey].items.push({ ...selectedProduct, type: category });
        currentTotal += selectedProduct.price;
      }
    });

    tiers[tierKey].total = currentTotal;
  });

  return tiers;
}