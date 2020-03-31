import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PerilCollection } from './PerilCollection/PerilCollection'
import { Peril, TypeOfContract } from './types'

interface Props {
  insuranceType: TypeOfContract
}

export const Perils: React.FC<Props> = ({ insuranceType }) => {
  const [perils, setPerils] = useState<[] | Peril[]>([])

  useEffect(() => {
    const fetchPerils = async () => {
      const url = `https://graphql.dev.hedvigit.com/graphql`
      const data = {
        operationName: 'Perils',
        variables: {
          typeOfContract: insuranceType,
          locale: 'sv_SE',
        },
        query: `
            query Perils($typeOfContract: TypeOfContract!, $locale: Locale!) {
              perils(contractType: $typeOfContract, locale: $locale) {
                title
                description
                covered
                icon {
                  variants {
                    light {
                      svgUrl
                    }
                  }
                }
              }
            }
          `,
      }
      try {
        const perilsRequest = await axios.post(url, data, {
          withCredentials: false,
          headers: {
            Accept: '*/*',
            'content-type': 'application/json',
          },
        })
        const perilsData = await perilsRequest.data.data.perils
        setPerils(perilsData)
      } catch (e) {
        throw e
      }
    }

    fetchPerils()
  }, [insuranceType])

  return (
    <>
      <PerilCollection perils={perils} />
      {/* TODO Add Peril modal */}
    </>
  )
}
