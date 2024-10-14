
import * as React from 'react';
import { kv } from '@vercel/kv';

export async function GET(request) {
  try {
    //const body = await request.json();
    //const payer_id = body.payer_id;
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    const payer_id = searchParams.get('payer_id');

    if (payer_id && payer_id === "12345678") {
      await kv.set("idx1", "1");
      await kv.set("idx2", "1");
      await kv.set("idx3", "1");

      await kv.set("key3-20", "FD66E2D457BA9C49D36169BF22355257");
      await kv.set("key3-1", "B7DB508F910691D03EAC81CB631AE3FC");
      await kv.set("key3-2", "979B3EB4EA1A885F8B9B3AF81680508E");
      await kv.set("key3-3", "5B9E563A53D298D07E5A87D509A75695");
      await kv.set("key3-4", "B37D16FAE42756A988D30E5B54D9AF9E");
      await kv.set("key3-5", "7E7EDBDB4A282B636233706ECBB80C06");
      await kv.set("key3-6", "A8D12A0678A185C3E2558C9F4CD7578C");
      await kv.set("key3-7", "F7526B2CD09B9064826F1E53780EB92B");
      await kv.set("key3-8", "DAA34D9CF052D0329B5F3537A2ECD763");
      await kv.set("key3-9", "F7E0CE7E7D3A91F088C8B6C80040F5DC");

      await kv.set("key3-10", "8780AB8154E61DF05FC657E4569AE349");
      await kv.set("key3-11", "75FA776DD9AB66F9AD2CE2EBF7F4CAB3");
      await kv.set("key3-12", "5953A39121D0785490B29F52D13B0E72");
      await kv.set("key3-13", "B3B9F311E85ACFF9EB424B65841A7C67");
      await kv.set("key3-14", "D22A5DA3DAC6193368C08F0F7E76B3ED");
      await kv.set("key3-15", "4A2883E1EA28BF84526896FFA66D22B6");
      await kv.set("key3-16", "5E544462C37CC159F0E46F36308D1811");
      await kv.set("key3-17", "CFA3BD0A6C60E20572CAE22377E71CDF");
      await kv.set("key3-18", "4E33492353EF17D4789971EDAA9BB5F3");
      await kv.set("key3-19", "B53DCAE106DF2C0D3C0F78483484FFA0");

      await kv.set("key2-20", "E17B746877A3CFD9E1E0DAAE8A3D2D08");
      await kv.set("key2-1", "F437BBBCE78625F491794FAAD76729E1");
      await kv.set("key2-2", "663D1C1F47CD04E8838577CB2AE18DAE");
      await kv.set("key2-3", "8742438094A1EE9C72C14C3E65384C86");
      await kv.set("key2-4", "30A463C289F7014C15E3E2528A971FE8");
      await kv.set("key2-5", "7DE4EDB3FABC2648537FB4BE8C742B1C");
      await kv.set("key2-6", "F08166370503D3476A18E67E3DF5DD78");
      await kv.set("key2-7", "BE3576A6B9F26397D4F79F922E413D0D");
      await kv.set("key2-8", "33D5AF436ACFCB448E30BDBCFD121925");
      await kv.set("key2-9", "C27E6C837144B5A4C622C6D60FEAC5AD");

      await kv.set("key2-10", "10C04B3A020235CF8B90E63F6924149A");
      await kv.set("key2-11", "61A4A8ADEEB8AAE9A64BE56E50E4E440");
      await kv.set("key2-12", "63F9061C86125CD29E1540760D694BE8");
      await kv.set("key2-13", "8D5C66F920AF8DA77DC08E3730557028");
      await kv.set("key2-14", "5ADF090035A1FEC324BA8D4659D40603");
      await kv.set("key2-15", "29118F9B021BB871DA02CE9DFB55566A");
      await kv.set("key2-16", "025FAFCE58D6F4E449611105AE2C589F");
      await kv.set("key2-17", "DFE213E9D376DB06E74CEE011B31CB07");
      await kv.set("key2-18", "D0B41C7A216277CEA9611E93940E06A8");
      await kv.set("key2-19", "A22180DB5C65168B502C790A3622F24B");


      await kv.set("key1-20", "C6089FEF03424763D43D98AB1E900739");
      await kv.set("key1-1", "762275A4D516FED1CB9D32EE141989AB");
      await kv.set("key1-2", "DCA63724E258AFEC34045AA68A9628BB");
      await kv.set("key1-3", "0A2B050697A5DA94C6943E451C0C91A7");
      await kv.set("key1-4", "61AD273AD554DC91ABE947442C157BE0");
      await kv.set("key1-5", "993F6815F86678C7C9B3CF6C3AEC970E");
      await kv.set("key1-6", "D2EDC6F291F68EFA6140119F4F9BCEA4");
      await kv.set("key1-7", "3FBDC4807D8101B3DEC3609C7319573E");
      await kv.set("key1-8", "9E1AF76E1301A026E4E081FC1CB28A6B");
      await kv.set("key1-9", "3304C8081284892A154A34E1A52B6056");

      await kv.set("key1-10", "7A2A8CD4C2DB474D9AB8B501B0C0067F");
      await kv.set("key1-11", "61702C5AF048867E27E1AB29FC0B1211");
      await kv.set("key1-12", "C34AE4AF43A1536FC565673DA7368BE2");
      await kv.set("key1-13", "F43EA4FE59E115B04E6612F4D9CD4F2E");
      await kv.set("key1-14", "9800094A16E86FA7424D7279421DD6D0");
      await kv.set("key1-15", "64D9EDB6AE996E0A679F8B2C54F1A78F");
      await kv.set("key1-16", "D0E5CEC1ACBC6F2E58D8A6386002977F");
      await kv.set("key1-17", "4369EFBA5F9FE89715FFA1D8588D61B6");
      await kv.set("key1-18", "486A07B756A5CA200B4AD18EABBC6337");
      await kv.set("key1-19", "00C36BCB6A416BDDF4287E58C43DE470");

      return Response.json({ key: "success " });
    }
    else {
      return Response.json({ key: "payer_id error " });
    }


  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
