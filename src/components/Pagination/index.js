import React, { useState } from "react";
import PropTypes from "prop-types";

import * as S from "./styles";

export default function Pagination({
  pageCount,
  pageNeighbours,
  onPageChange,
}) {
  const [selectedPage, setPage] = useState(1);

  const getRange = (from, to) => {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += 1;
    }

    return range;
  };

  const renderPaginate = () => {
    let items = [];
    const HAS_PREV = "PREV";
    const HAS_NEXT = "NEXT";

    const defaultBoundary = pageNeighbours + 2;
    const leftBoundary = selectedPage - 1 >= defaultBoundary;
    const rightBoundary = pageCount - selectedPage >= defaultBoundary;

    if (!leftBoundary && rightBoundary) {
      const extraPages = getRange(1, defaultBoundary + 2);
      items.push(...extraPages, HAS_NEXT, pageCount);
    } else if (leftBoundary && !rightBoundary) {
      const extraPages = getRange(pageCount - (defaultBoundary + 1), pageCount);
      items.push(1, HAS_PREV, ...extraPages);
    } else {
      const extraPages = getRange(
        selectedPage - pageNeighbours,
        selectedPage + pageNeighbours
      );
      items.push(1, HAS_PREV, ...extraPages, HAS_NEXT, pageCount);
    }

    return items.map((item, idx) => {
      if (item === "PREV") {
        return (
          <S.PaginateBreakLabel key={idx}>
            <S.PaginateItem href="#" onClick={previousTargetHandler}>
              ...
            </S.PaginateItem>
          </S.PaginateBreakLabel>
        );
      }

      if (item === "NEXT") {
        return (
          <S.PaginateBreakLabel key={idx}>
            <S.PaginateItem href="#" onClick={nextTargetHandler}>
              ...
            </S.PaginateItem>
          </S.PaginateBreakLabel>
        );
      }

      return (
        <S.PaginateItemLabel key={idx}>
          <S.PaginateItem
            className={selectedPage === item && "active"}
            href="#"
            onClick={(e) => goToPage(e, item)}
          >
            {item}
          </S.PaginateItem>
        </S.PaginateItemLabel>
      );
    });
  };

  const goToPage = (evt, idx) => {
    evt.preventDefault();
    setPage(idx);
    onPageChange(idx);
  };

  const nextTargetHandler = (evt) => {
    evt.preventDefault();

    const skipCount = pageNeighbours + 2;
    setPage((prev) => prev + skipCount);
    onPageChange((prev) => prev + skipCount);
  };

  const previousTargetHandler = (evt) => {
    evt.preventDefault();

    const skipCount = pageNeighbours + 2;
    setPage((prev) => prev - skipCount);
    onPageChange((prev) => prev - skipCount);
  };

  return <S.PaginateContainer>{renderPaginate()}</S.PaginateContainer>;
}

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  pageNeighbours: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
