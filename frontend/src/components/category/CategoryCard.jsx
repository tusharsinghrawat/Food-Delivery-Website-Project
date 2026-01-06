import { Card, CardContent } from '@/components/ui/card';

const CategoryCard = ({ category, onClick, isSelected }) => {
  return (
    <Card
      className={`overflow-hidden cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <CardContent className="p-2 text-center">
        <span className="text-sm font-medium">{category.name}</span>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
