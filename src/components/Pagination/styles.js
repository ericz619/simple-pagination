import styled from "styled-components";

export const PaginateContainer = styled.ul`
  display: flex;
  list-style: none;
`;

export const PaginateNextLabel = styled.li`
  border: 1px solid #000000;
`;

export const PaginatePreviousLabel = styled.li`
  border: 1px solid #000000;
`;

export const PaginateBreakLabel = styled.li``;

export const PaginateItemLabel = styled.li``;

export const PaginateItem = styled.a`
  font-size: 18px;
  padding: 10px 15px;
  text-decoration: none;
  color: #9e9d89;
  border: 1px solid #ced4da;
  font-weight: 700;

  &.active {
    color: #8ab6d6;
  }
`;
