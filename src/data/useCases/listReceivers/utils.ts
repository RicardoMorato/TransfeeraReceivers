import { ReceiverModel } from "@/domain/models";

export const paginate = (
  array: Array<ReceiverModel>,
  pageNumber = 1,
  pageSize = 10
) => {
  const totalPages = Math.ceil(array.length / pageSize);

  if (pageSize >= array.length) return { data: array, totalPages };

  const start = pageSize * (pageNumber - 1);
  const end = start + 10;

  return { data: array.slice(start, end), totalPages };
};
