import { useMemo } from "react";
import { DataTable } from "react-native-paper";

type PaginationProps = {
  page: number;
  total: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ page, total, onPageChange }: PaginationProps) {
  const meta = useMemo(() => {
    return {
      from: (page - 1) * 6,
      to: page * 6,
      total: total,
    };
  }, []);

  return (
    <DataTable.Pagination
      page={page}
      numberOfPages={Math.floor(meta.total / 6)}
      onPageChange={p => {
        if (!p) {
          return;
        }
        onPageChange(p);
      }}
      label={`${meta.from + 1}-${meta.to} of ${meta.total}`}
    />
  );
}
