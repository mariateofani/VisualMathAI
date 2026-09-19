"use client";

type RealWorldApplicationProps = {
  formula?: string;
};

export default function RealWorldApplication({
  formula = "y = 2x + 3",
}: RealWorldApplicationProps) {
  return (
    <section
      aria-labelledby="real-world-title"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-5">
        <p className="mb-1 text-sm font-semibold text-violet-600">
          FR-09
        </p>

        <h2
          id="real-world-title"
          className="text-xl font-bold text-slate-900"
        >
          Contoh Penerapan Nyata
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          Contoh berikut menghubungkan rumus dengan situasi kehidupan
          nyata agar konsep matematika lebih mudah dipahami.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-violet-100 bg-violet-50 p-5">
          <h3 className="font-semibold text-violet-900">
            Tarif perjalanan
          </h3>

          <p className="mt-3 text-sm leading-6 text-violet-900">
            Misalkan sebuah layanan transportasi memiliki biaya awal
            Rp3.000 dan biaya Rp2.000 untuk setiap kilometer perjalanan.
          </p>

          <div className="mt-4 rounded-lg bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Model matematika
            </p>

            <p className="mt-2 font-mono text-lg font-bold text-slate-900">
              {formula}
            </p>
          </div>
        </article>

        <article className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="font-semibold text-slate-900">
            Interpretasi variabel
          </h3>

          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-semibold text-slate-700">
                x
              </dt>
              <dd className="text-slate-600">
                Jarak perjalanan dalam kilometer.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-slate-700">
                2
              </dt>
              <dd className="text-slate-600">
                Biaya tambahan untuk setiap satu satuan x.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-slate-700">
                3
              </dt>
              <dd className="text-slate-600">
                Biaya awal ketika x bernilai 0.
              </dd>
            </div>
          </dl>
        </article>
      </div>

      <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
        <p className="text-sm font-semibold text-emerald-900">
          Kesimpulan
        </p>

        <p className="mt-1 text-sm leading-6 text-emerald-800">
          Fungsi linear dapat digunakan untuk memodelkan hubungan
          antara biaya dan jarak ketika biaya bertambah secara konstan
          terhadap setiap tambahan jarak.
        </p>
      </div>
    </section>
  );
}