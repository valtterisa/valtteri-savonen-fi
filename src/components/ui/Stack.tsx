import type { ReactNode } from "react";

type StatusBadgeProps = {
  active: boolean;
};

export function StatusBadge({ active }: StatusBadgeProps) {
  if (active) {
    return (
      <span className="text-green-500 text-xs bg-green-500/10 px-2 py-1 rounded-md">
        active
      </span>
    );
  }

  return (
    <span className="text-red-500 text-xs bg-red-500/10 px-2 py-1 rounded-md">
      discontinued
    </span>
  );
}

type TechStackProps = {
  items: string[];
};

export function TechStack({ items }: TechStackProps) {
  return (
    <div className="flex flex-wrap gap-2 text-sm text-gray-500">
      {items.map((item, index) => (
        <span key={item}>
          {item}
          {index < items.length - 1 ? " /" : ""}
        </span>
      ))}
    </div>
  );
}

type StackRootProps = {
  children: ReactNode;
  className?: string;
};

function StackRoot({ children, className = "space-y-8" }: StackRootProps) {
  return <div className={className}>{children}</div>;
}

type StackItemProps = {
  children: ReactNode;
  className?: string;
};

function StackItem({ children, className = "" }: StackItemProps) {
  return <div className={className}>{children}</div>;
}

export const Stack = {
  Root: StackRoot,
  Item: StackItem,
};
