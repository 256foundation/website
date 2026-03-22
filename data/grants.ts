import type { Grant } from '@/types'

// TODO: Add open grant recipients as they are funded
export const grantLog: Grant[] = [
  {
    name: 'Ember One',
    grantee: 'Skot',
    category: 'hardware',
    amountBTC: 1.0,
    status: 'active',
    dateFunded: '2024-07-01',
    description: 'Open-source Bitcoin mining hashboard reference design',
  },
  {
    name: 'Mujina',
    grantee: 'Mujina Development Team',
    category: 'software',
    amountBTC: 1.0,
    status: 'active',
    dateFunded: '2024-07-01',
    description: 'Open-source Bitcoin mining firmware',
  },
  {
    name: 'Libre Board',
    grantee: 'Libre Board Development Team',
    category: 'hardware',
    amountBTC: 1.0,
    status: 'active',
    dateFunded: '2024-07-01',
    description: 'Open-source Bitcoin miner control board',
  },
  {
    name: 'Hydrapool',
    grantee: 'Hydrapool Development Team',
    category: 'software',
    amountBTC: 1.2,
    status: 'active',
    dateFunded: '2024-07-01',
    description: 'One-click deployable open-source Bitcoin mining pool',
  },
]
