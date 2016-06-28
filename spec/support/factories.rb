FactoryGirl.define do
  factory :idea do
    sequence :title do |n|
      "Generic Title #{n}"
    end
    sequence :body do |n|
      "Generic Body #{n}"
    end
    sequence :quality do |n|
      "Generic Title #{n}"
    end
    sequence :quality, ['swill',
                        'plausible',
                        'genius'].cycle do |quality|
      quality
    end
  end
end
