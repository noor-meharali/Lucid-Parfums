import { useId, useRef, useState, type InputHTMLAttributes } from 'react';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { FieldShell } from '@/components/form/FieldShell';
import { IconButton } from '@/components/common/IconButton';

interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type' | 'onChange'> {
  id?: string;
  label?: string;
  helperText?: string;
  error?: string;
  onFilesSelected?: (files: FileList | null) => void;
}

/**
 * Styling foundation for file uploads (e.g. future product images).
 * Presents a dashed drop zone and lists selected file names; the
 * actual upload/storage integration arrives with the feature that
 * needs it.
 */
export function FileUpload({ id, label, helperText, error, className, accept, multiple, onFilesSelected, ...props }: FileUploadProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  function handleFiles(files: FileList | null) {
    setFileNames(files ? Array.from(files).map((file) => file.name) : []);
    onFilesSelected?.(files);
  }

  return (
    <FieldShell label={label} htmlFor={inputId} error={error} helperText={helperText}>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFiles(event.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') inputRef.current?.click();
        }}
        className={cn(
          'flex cursor-pointer flex-col items-center gap-2 rounded-md border border-dashed px-6 py-8 text-center transition-colors',
          isDragging ? 'border-gold bg-champagne/20' : 'border-beige bg-cream hover:border-gold/60',
          className,
        )}
      >
        <UploadCloud className="h-6 w-6 text-taupe" aria-hidden="true" />
        <p className="text-body-sm text-espresso">
          <span className="font-medium text-gold">Click to upload</span> or drag and drop
        </p>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={(event) => handleFiles(event.target.files)}
          {...props}
        />
      </div>
      {fileNames.length > 0 && (
        <ul className="mt-1 flex flex-col gap-1.5">
          {fileNames.map((name) => (
            <li key={name} className="flex items-center gap-2 rounded-sm bg-cream px-3 py-2 text-body-sm text-espresso">
              <FileIcon className="h-4 w-4 shrink-0 text-taupe" aria-hidden="true" />
              <span className="flex-1 truncate">{name}</span>
              <IconButton
                type="button"
                label={`Remove ${name}`}
                className="h-6 w-6"
                onClick={() => setFileNames((current) => current.filter((n) => n !== name))}
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </IconButton>
            </li>
          ))}
        </ul>
      )}
    </FieldShell>
  );
}
