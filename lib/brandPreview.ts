import type {DefaultDocumentNodeResolver} from 'sanity/structure'
import type {DocumentActionComponent, DocumentActionsResolver, SanityDocument} from 'sanity'
import {Iframe} from 'sanity-plugin-iframe-pane'
import {LaunchIcon} from '@sanity/icons/Launch'

const brandUrl = (doc?: SanityDocument | null) => {
  const slug = (doc?.slug as {current?: string} | undefined)?.current
  return slug ? `${window.location.origin}/brands/${slug}` : null
}

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  if (schemaType !== 'brands') return S.document().views([S.view.form()])
  return S.document().views([
    S.view.form(),
    S.view
      .component(Iframe)
      .options({
        url: (doc: SanityDocument | null) => brandUrl(doc) || new Error('Ajoutez un slug pour voir la page'),
        reload: {button: true},
        showDisplayUrl: true,
      })
      .title('Preview'),
  ])
}

const OpenPageAction: DocumentActionComponent = ({published, draft}) => {
  const url = brandUrl(published) || brandUrl(draft)
  return {
    label: 'Ouvrir la page',
    icon: LaunchIcon,
    disabled: !published,
    title: published ? url || undefined : 'La marque doit être publiée',
    onHandle: () => {
      if (url) window.open(url, '_blank', 'noopener')
    },
  }
}

export const brandActions: DocumentActionsResolver = (prev, {schemaType}) =>
  schemaType === 'brands' ? [...prev, OpenPageAction] : prev
