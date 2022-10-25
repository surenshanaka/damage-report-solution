export enum StatusType {
  Approve = 'approve',
  Reject = 'reject',
  Pending = 'pending',
  Error = 'error',
}
export type StatusTypeApprove = {
  type: StatusType.Approve;
};

export type StatusTypeReject = {
  type: StatusType.Reject;
};

export type StatusTypePending = {
  type: StatusType.Pending;
};

export type StatusTypeError = {
  type: StatusType.Error;
};
