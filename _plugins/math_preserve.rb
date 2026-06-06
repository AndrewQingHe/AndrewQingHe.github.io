module Jekyll
  module MathPreserve
    PLACEHOLDER_PREFIX = "MATH_PRESERVE_PLACEHOLDER_"

    def self.protect_math_content(content)
      placeholders = {}
      index = 0

      protected_content = content.gsub(/(?<!\\)(\$\$?)(.+?)(?<!\\)\1/m) do
        token = "#{PLACEHOLDER_PREFIX}#{index}@@"
        placeholders[token] = Regexp.last_match[0]
        index += 1
        token
      end

      [protected_content, placeholders]
    end

    def self.restore_math_output(output, placeholders)
      placeholders.reduce(output) do |html, (token, original)|
        html.gsub(token, original)
      end
    end
  end

  Jekyll::Hooks.register [:pages, :documents], :pre_render do |doc|
    next unless doc.respond_to?(:content) && doc.content.is_a?(String)
    next unless doc.extname =~ /\.(md|markdown)$/i

    protected_content, placeholders = MathPreserve.protect_math_content(doc.content)

    unless placeholders.empty?
      doc.content = protected_content
      doc.data["math_preserve_placeholders"] = placeholders
    end
  end

  Jekyll::Hooks.register [:pages, :documents], :post_render do |doc|
    placeholders = doc.data["math_preserve_placeholders"]
    next if placeholders.nil? || placeholders.empty?
    doc.output = MathPreserve.restore_math_output(doc.output, placeholders)
  end
end
