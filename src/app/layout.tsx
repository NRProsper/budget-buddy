import {Poppins} from "next/font/google";
import "./globals.css";
import {baseUrl, ensureStartsWith} from "@/lib/utils";
import {Metadata} from "next";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
        default: SITE_NAME!,
        template: `%s | ${SITE_NAME}`
    },
    description: 'Your ultimate transaction tracker and budget management tool. ' +
        'Easily track expenses, monitor income, set spending limits, and get notified when you\'re over budget. ' +
        'Visualize your financial health and make informed decisions with BudgetBuddy!',
    keywords: [
        "Budget management app",
        "Track expenses online",
        "Income and expense tracker",
        "Wallet management tool",
        "Personal finance planner",
        "Spending tracker app",
        "Budget tracking software",
        "Visualize transactions",
        "Financial health app",
        "Money management tool",
        "Set spending limits online",
        "Best budget app 2025",
        "Transaction tracker app",
        "Expense monitoring app",
        "BudgetBuddy features"
    ],
    robots: {
        index: true, // This tells web crawlers that they are allowed to index the page (include in search results)
        follow: true //This allows crawlers to follow links on the page (follow, discover and index other linked pages)
    },
    ...(twitterCreator &&
        twitterSite && {
            twitter: {
                card: 'summary_large_image',
                creator: twitterCreator,
                site: twitterSite
            }
        })
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={` ${poppins.className} antialiased bg-white dark:bg-red-300`}
      >
        {children}
      </body>
    </html>
  );
}
