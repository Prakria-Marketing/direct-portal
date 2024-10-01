import React from 'react';

interface Member {
    user?: {
        name: string;
    };
}

interface MemberListProps {
    members: Member[];
}

const MemberList: React.FC<MemberListProps> = ({ members }) => {
    const visibleMembers = members.slice(0, 2); // Show the first 2 members
    const remainingCount = members.length - visibleMembers.length; // Calculate how many more members remain

    return (
        <div>
            {visibleMembers.map((member, index) => (
                <span key={index}>
                    {member.user?.name}
                    {index < visibleMembers.length - 1 && ', '}
                </span>
            ))}
            {remainingCount > 0 && <span> and {remainingCount} more</span>}
        </div>
    );
};

export default MemberList;
