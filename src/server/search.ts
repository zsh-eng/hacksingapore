import { Source } from '@/lib/ai';
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { OpenAIEmbeddings } from '@langchain/openai';
import { createClient } from '@supabase/supabase-js';
import csv from 'csvtojson';
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

const run = async () => {
  // await vectorSearch('how much should my first flat cost?');
  const filepath = 'metadata.csv';
  const jsonArray = await csv().fromFile(filepath);
  const sources: Source[] = jsonArray.map((e) => {
    return {
      pageContent: e['Content'],
      metadata: {
        type: e['Source'],
        link: e['Links'],
        id: e['field1'],
      },
    };
  });
  const documents = sources.map(
    ({ pageContent, metadata }) =>
      new Document({
        pageContent,
        metadata,
      })
  );

  await store.addDocuments(documents);
  console.log('done');
};
