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
      from: page * 6,
      to: Math.min((page + 1) * 6, total),
      total: total,
    };
  }, [total, page]);

  return (
    <DataTable>
      <DataTable.Pagination
        page={page}
        numberOfPages={meta.total}
        onPageChange={page => {
          // console.log("page", page);
          onPageChange(page);
        }}
        label={`${meta.from + 1}-${meta.to} of ${meta.total}`}
      />
    </DataTable>
  );
}
