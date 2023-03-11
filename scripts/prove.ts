import { Keypair } from '@safecoin/web3.js';
import {Config, prove, verify} from '../src'
import * as fs from "fs";
import * as os from "os";

const keypair = Keypair.fromSecretKey(Buffer.from(JSON.parse(fs.readFileSync(`${os.homedir()}/.config/safecoin/id.json`, { encoding: 'utf-8'}))));

(async () => {
  const config: Config = {
    cluster: 'mainnet-beta',
    commitment: 'confirmed',
    supportedClusterUrls: {
      'mainnet-beta': 'https://api.mainnet-beta.safecoin.org'
    }
  };
  const proof = await prove(keypair, undefined);

  console.log("Wallet: " + keypair.publicKey.toBase58());
  console.log("Proof: " + proof.toString('base64'));

  const verified = await verify(proof, keypair.publicKey, config).then(() => true);
  console.log("Verified: " + verified)
})();
