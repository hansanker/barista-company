export interface Message {
  checklist: string; // checklist id
  text: string;
  time: string;
  user: string;   // user id
  name?: string;   // user name
}
