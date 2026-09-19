import type { Metadata } from "next";
import BackButton from "@/app/components/BackButton";

type Props = {
  params: Promise<{
    topic: string;
  }>;
};

function formatTopic(topic: string) {
  return topic
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { topic } = await params;
  const topicName = formatTopic(topic);

  return {
    title: `${topicName} | VisualMath AI`,
    description: `Pelajari materi matematika ${topicName} melalui VisualMath AI.`,
  };
}

export default async function TopicPage({ params }: Props) {
  const { topic } = await params;
  const topicName = formatTopic(topic);

  return (
    <section className="mx-auto max-w-3xl px-6 py-10">
    <BackButton fallback="/admin" />
      <p className="text-sm font-medium text-blue-600">
        VisualMath AI
      </p>

      <h1 className="mt-2 text-3xl font-bold text-slate-900">
        Materi {topicName}
      </h1>

      <p className="mt-3 text-slate-600">
        Halaman materi dinamis untuk topik {topicName}.
      </p>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow">
        <h2 className="text-xl font-semibold text-slate-900">
          Pembelajaran Matematika
        </h2>

        <p className="mt-2 text-slate-600">
          Konten materi dapat dikembangkan sesuai topik yang
          dipilih oleh mahasiswa.
        </p>
      </div>
    </section>
  );
}