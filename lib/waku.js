"use client";
import {
  createLightNode,
  bytesToUtf8,
  utf8ToBytes,
  waitForRemotePeer,
  createDecoder,
  createEncoder,
} from "https://unpkg.com/@waku/sdk@0.0.18/bundle/index.js";

import { createEncoder, createDecoder } from "@waku/sdk";

const contentTopic = "gameft/0";

const encoder = createEncoder({ contentTopic });
const decoder = createDecoder(contentTopic);

export const createNode = async () => {
  const node = await createLightNode({ defaultBootstrap: true });
  await node.start();
  await waitForRemotePeer(node);
};

export const sendBidMessage = async () => {};

export const recieveBidMessage = async () => {};

export const retrieveResponse = async () => {};
