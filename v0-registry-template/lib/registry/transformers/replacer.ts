import { Transformer } from "@/lib/registry/transformers"
import { Node } from "ts-morph"

export const replacer: Transformer = async ({ sourceFile }) => {
  const replaceComments: {
    needle: string
    haystack: string
    commentRange: { pos: number; end: number }
  }[] = []

  function visitNode(node: Node) {
    const comments = node.getLeadingCommentRanges()

    comments.forEach((comment) => {
      const commentText = comment.getText()
      const match = commentText.match(/@replacer\s+([^\s]+)\s+([^\s]+)/)
      if (match) {
        replaceComments.push({
          needle: match[1],
          haystack: match[2],
          commentRange: {
            pos: comment.getPos(),
            end: comment.getEnd(),
          },
        })
      }
    })

    node.forEachChild(visitNode)
  }

  visitNode(sourceFile)

  let updatedText = sourceFile.getFullText()

  // Sort ranges in reverse order to not affect subsequent positions
  replaceComments.sort((a, b) => b.commentRange.pos - a.commentRange.pos)

  // First remove all @replace comments
  replaceComments.forEach(({ commentRange }) => {
    const beforeComment = updatedText.slice(0, commentRange.pos)
    const afterComment = updatedText.slice(commentRange.end)
    // Remove the newline after the comment if it exists
    updatedText = beforeComment + afterComment.replace(/^\r?\n/, "")
  })

  // Then perform the replacements
  replaceComments.forEach(({ needle, haystack }) => {
    updatedText = updatedText.replace(new RegExp(needle, "g"), haystack)
  })

  sourceFile.replaceWithText(updatedText)

  return sourceFile
}
