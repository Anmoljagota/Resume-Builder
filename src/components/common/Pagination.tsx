import {
  PaginationButtonProps,
  PaginationProps,
  Pagination as FlowbitePagination,
  TextInput,
  Button,
} from "flowbite-react";
import React, { FC } from "react";

interface Props extends PaginationProps {
  total: number;
  limit: number;
  skip: number;
}

function Pagination(props: Props) {
  const [typedJumpPage, setTypedJumpPage] = React.useState<number | undefined>(
    undefined
  );
  return (
    <div>
      <div className="flex gap-4 items-center">
        <FlowbitePagination {...props} />
        <div className="flex items-center gap-2">
          Jump to page{" "}
          <TextInput
            className="w-16"
            type="number"
            value={typedJumpPage}
            onChange={(e) => {
              setTypedJumpPage(parseInt(e.target.value));
            }}
          />
          <Button
            onClick={() => {
              if (typedJumpPage) {
                props.onPageChange(typedJumpPage);
              }
            }}
          >
            Go
          </Button>
        </div>
      </div>
      <div>
        Showing from {props.skip + 1} to{" "}
        {Math.min(props.skip + props.limit, props.total)} of {props.total}
      </div>
      <div>
        Page #{props.currentPage} of {props.totalPages}
      </div>
    </div>
  );
}

export default Pagination;
