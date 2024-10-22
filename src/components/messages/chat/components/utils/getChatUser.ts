export function getChatUser(user: any, state: any): any {
    const members = Object.values(state.members);
    const currentUser = members.length === 2
        ? members.find((member: any) => member.user_id !== user?.userId)
        : null;
    return currentUser;
}
