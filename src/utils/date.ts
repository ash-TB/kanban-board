export function formatDate(d: Date|string) : string {
    const date = typeof d === "string" ? new Date(d) : d;
    return date.toISOString().split("T")[0];
}