export interface Member {
  id: string;
  name: string;
  mobile: string;
  place: string;
  aadhaar?: string;
  membershipId: string;
  registrationDate: string;
  status: "active" | "inactive";
}

// In-memory store for demo (replace with Lovable Cloud DB)
const members: Member[] = [];
let counter = 0;

export function generateMembershipId(): string {
  counter++;
  const year = new Date().getFullYear();
  return `SSS-${year}-${String(counter).padStart(5, "0")}`;
}

export function registerMember(data: { name: string; mobile: string; place: string; aadhaar?: string }): { success: boolean; member?: Member; error?: string } {
  // Check duplicate mobile
  if (members.find((m) => m.mobile === data.mobile)) {
    return { success: false, error: "इस मोबाइल नंबर से पहले ही पंजीकरण किया जा चुका है" };
  }
  // Check duplicate aadhaar
  if (data.aadhaar && members.find((m) => m.aadhaar === data.aadhaar)) {
    return { success: false, error: "यह आधार नंबर पहले से पंजीकृत है" };
  }

  const member: Member = {
    id: crypto.randomUUID(),
    name: data.name,
    mobile: data.mobile,
    place: data.place,
    aadhaar: data.aadhaar || undefined,
    membershipId: generateMembershipId(),
    registrationDate: new Date().toISOString(),
    status: "active",
  };
  members.push(member);
  return { success: true, member };
}

export function getMemberByMobile(mobile: string): Member | undefined {
  return members.find((m) => m.mobile === mobile);
}

export function getMemberById(membershipId: string): Member | undefined {
  return members.find((m) => m.membershipId === membershipId);
}

export function getAllMembers(): Member[] {
  return [...members];
}

export function deleteMember(id: string): boolean {
  const idx = members.findIndex((m) => m.id === id);
  if (idx >= 0) { members.splice(idx, 1); return true; }
  return false;
}
