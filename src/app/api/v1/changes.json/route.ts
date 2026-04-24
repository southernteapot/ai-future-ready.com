import changesData from "@/lib/changes-data.json";

type ChangeEntry = {
  changed_at: string;
  type: string;
};

function isValidDate(value: string | null): value is string {
  return Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value));
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const since = url.searchParams.get("since");
  const type = url.searchParams.get("type");
  const items = (changesData.items as ChangeEntry[]).filter((item) => {
    if (isValidDate(since) && item.changed_at.slice(0, 10) < since) {
      return false;
    }

    if (type && item.type !== type) {
      return false;
    }

    return true;
  });

  return Response.json({
    ...changesData,
    query: {
      since: isValidDate(since) ? since : null,
      type: type || null,
    },
    count: items.length,
    items,
  });
}
