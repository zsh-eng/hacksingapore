import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { OpenAIEmbeddings } from '@langchain/openai';
import { createClient } from '@supabase/supabase-js';
import { Document } from 'langchain/document';


const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseKey) throw new Error(`Expected SUPABASE_SERVICE_ROLE_KEY`);

const url = process.env.SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);

export type Content = {
  text: string;

  metadata: Record<string, unknown>;
};

export const client = createClient(url, supabaseKey);
export const store = new SupabaseVectorStore(new OpenAIEmbeddings(), {
  client,
  tableName: 'documents',
  queryName: 'match_documents',
});

export async function createDocuments(contents: Content[]) {
  const documents = contents.map(
    ({ text, metadata }) =>
      new Document({
        pageContent: text,
        metadata,
      })
  );
  return store.addDocuments(documents);
}

export async function vectorSearch(query: string) {
  const results = await store.similaritySearch(query, 3);
  return results;
}

const link =
  'https://www.mymoneysense.gov.sg/buying-a-house/purchase-guide/my-first-house';
const title = 'How much should your first flat cost?';

const sampletext = `
How much should your first flat cost?
This is part 1 of a 7-part home purchase guide. You can check out our full guide.

A flat will probably be the biggest purchase in your life and choosing an affordable flat makes a difference.
During your housing loan repayment years, you may have less cash at hand after paying off your monthly instalments. You may also need more savings to tide over emergencies such as a job loss. In the long run, your housing loan may affect when you can achieve financial freedom and retire. That’s why on top of your housing needs, it is important to keep your budget in mind as you go flat hunting.
Broad rule of thumb for flat purchase price
As an easy and safe guide to remember for flat hunting, your flat purchase price should not exceed five times your annual household income. Your annual household income is the combined gross income that you and your family members who are buying the flat with you earn every year. To be safe, don’t include your bonuses as they may vary from year to year. You can visit the HDB flat portal to shortlist flats within this rule of thumb.
Work out an affordable housing budget using Mortgage Servicing Ratio
Once you have shortlisted suitable flats, you should use the Mortgage Servicing Ratio (MSR) to work out an affordable housing budget.
Your housing budget consists of:
Your available cash savings
CPF Ordinary Account (OA) savings
CPF housing grants you are eligible for
The housing loan amount you are eligible for
Besides keeping the MSR in mind when determining your housing loan, you should also look at the Total Debt Servicing Ratio (TDSR) to ensure the flat purchase is affordable for you.
1. Mortgage Servicing Ratio
You can only use up to 30% of your gross monthly income to pay for your monthly mortgage instalments. To be more prudent, keep it within 25% of your gross monthly income to use less cash or CPF savings.
2. Total Debt Servicing Ratio (when you take a bank loan)
You can only use up to 60% of your gross monthly income to pay for all your different monthly loan instalments if you had taken a property loan where the Option to Purchase (OTP) was granted before 16 Dec 2021 or up to 55% if you had taken a property loan where the OTP was granted on or after 16 Dec 2021.
By doing so, it helps you to balance between paying off your monthly mortgage instalments, managing your expenses and saving for other life goals.
`;

export const run = async () => {
  await vectorSearch('how much should my first flat cost?');
};
