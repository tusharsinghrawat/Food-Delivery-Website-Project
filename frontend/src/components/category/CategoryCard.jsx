import { Card, CardContent } from '@/components/ui/card';

const CategoryCard = ({ category, onClick, isSelected }) => {
  /* ===============================
     ✅ IMAGE HANDLER (GITHUB PAGES SAFE)
  ============================== */
  const getCategoryImage = (image) => {
    const base = import.meta.env.BASE_URL;

    if (!image) return `${base}images/placeholder.jpg`;

    // full URL support
    if (image.startsWith('http')) return image;

    // absolute local path
    if (image.startsWith('/')) return `${base}${image.slice(1)}`;

    // images from public/images
    return `${base}images/${image}`;
  };

  return (
    <Card
      className={`overflow-hidden cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={getCategoryImage(category.image)}
          alt={category.name}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `${import.meta.env.BASE_URL}images/placeholder.jpg`;
          }}
        />
      </div>
      <CardContent className="p-2 text-center">
        <span className="text-sm font-medium">{category.name}</span>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
