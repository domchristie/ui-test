group 'frontend' do
  guard 'coffeescript', :input => 'app/assets/coffeescript', :output=>'public/js'
  guard :concat, type: "js", files: %w(modules/*), input_dir: "public/js", output: "public/js/all", all_on_start: true

  guard 'sass', :input => 'app/assets/sass', :output=>'public/css', :style => :expanded
end
