/*
 * Copyright 2021 Mia srl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {FromSchema} from 'json-schema-to-ts'

const configurationSchema = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      description: 'Type of object to render',
      enum: ['row', 'column', 'element'],
    },
    content: {
      type: 'array',
      items: this,
    },
    tag: {
      type: 'string',
      description: 'Tag of the custom element to render',
    },
    url: {
      type: 'string',
      description: 'URL of  the entry point used to register and boot the custom element',
    },
    properties: {
      type: 'object',
      description: 'Properties configuration for each HTML element',
      additionalProperties: true,
    },
    attributes: {
      type: 'object',
      description: 'Attributes configuration for each HTML element',
      additionalProperties: true,
    },
    busDiscriminator: {
      type: 'string',
      description: 'Event bus discriminator',
    },
  },
  additionalProperties: false,
  required: ['type'],
} as const

export type Configuration = FromSchema<typeof configurationSchema>
