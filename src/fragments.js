//깊은관계의 쿼리문을 사용해야할때
export const COMMNET_FRAGMENT = `
  fragment CommentParts on Comment{
    id
    text
    user {
      username
    }
  }
`;
