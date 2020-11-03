import { useRouter } from "next/router";
import Link from "next/link";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

const CarPagination = ({ totalPages }) => {
  const { query } = useRouter();

  return (
    <Pagination
      page={+query.page}
      count={totalPages}
      renderItem={(item) => (
        <PaginationItem
          component={MaterialUiLink}
          query={query}
          item={item}
          {...item}
        />
      )}
    />
  );
};

const MaterialUiLink = React.forwardRef(({ item, query, ...props }, ref) => {
  return (
    <Link
      href={{
        pathname: "/cars",
        query: { ...query, page: item.page },
      }}
      // shallow
    >
      <a ref={ref} {...props}></a>
    </Link>
  );
});

export default CarPagination;
