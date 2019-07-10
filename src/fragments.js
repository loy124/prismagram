//깊은관계의 쿼리문을 사용해야할때

export const USER_FRAGMENT = `  
  fragment UserParts on User{
    id
    username
    email
    firstName
    lastName
    bio
  following {
    
    caption
  }
  }
  `;
