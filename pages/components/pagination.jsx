import { Pagination, Stack } from "@mui/material";
import React from "react";

const HomePagination = (props) => {
  return (
    <div>
      <Stack spacing={2} className="flex justify-center">
        <Pagination
          count={
            props?.searchTerm
              ? Math.ceil(props?.filteredPokemon.length / props?.itemsPerPage)
              : props?.totalPages
          }
          page={props?.currentPage}
          onChange={props?.handlePageChange}
          boundaryCount={3}
          siblingCount={0}
          showFirstButton
          showLastButton
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default HomePagination;
