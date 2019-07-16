//깊은관계의 쿼리문을 사용해야할때
export const USER_FRAGMENT = `
    id
    username
`;

export const COMMNET_FRAGMENT = `
    id
    text
    user {
      ${USER_FRAGMENT}
    }
`;

export const FILE_FRAGMENT = `
    id
    url
`;

export const FULL_POST_FRAGMENT = `
  fragment PostParts on Post{
    id
    location
    caption
    files {
      ${FILE_FRAGMENT}
    }
    comments {
      ${COMMNET_FRAGMENT}
    }
    user {
      ${USER_FRAGMENT}
    }
  }
`;
