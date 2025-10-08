import os
import json
import base64
from pathlib import Path

class StealthSIBackend:
    # ... existing initialization code ...
    
    def handle_autonomous_directive(self, data):
        """
        Handle autonomous file system operations from Stealth.SI
        """
        directive = data.get('directive', {})
        action = directive.get('action')
        
        try:
            if action == 'create_file':
                return self.create_file(
                    directive['path'],
                    directive['content']
                )
            elif action == 'modify_file':
                return self.modify_file(
                    directive['path'],
                    directive['content']
                )
            elif action == 'read_file':
                return self.read_file(directive['path'])
            elif action == 'scan_directory':
                return self.scan_directory(directive['path'])
            else:
                return {"error": f"Unknown action: {action}"}
                
        except Exception as e:
            return {"error": str(e)}
    
    def create_file(self, file_path, content):
        """Create file with full path resolution"""
        try:
            path = Path(file_path)
            path.parent.mkdir(parents=True, exist_ok=True)
            
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            return {
                "status": "success",
                "message": f"File created: {file_path}",
                "path": str(path.absolute())
            }
        except Exception as e:
            return {"error": f"File creation failed: {str(e)}"}
    
    def modify_file(self, file_path, content):
        """Modify existing file"""
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            return {
                "status": "success", 
                "message": f"File modified: {file_path}"
            }
        except Exception as e:
            return {"error": f"File modification failed: {str(e)}"}
    
    def read_file(self, file_path):
        """Read file content"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            return {
                "status": "success",
                "content": content,
                "path": file_path
            }
        except Exception as e:
            return {"error": f"File read failed: {str(e)}"}
    
    def scan_directory(self, directory_path):
        """Scan directory structure"""
        try:
            path = Path(directory_path)
            if not path.exists():
                return {"error": f"Directory does not exist: {directory_path}"}
            
            result = {
                "path": str(path.absolute()),
                "files": [],
                "directories": []
            }
            
            for item in path.iterdir():
                if item.is_file():
                    result["files"].append({
                        "name": item.name,
                        "size": item.stat().st_size,
                        "modified": item.stat().st_mtime
                    })
                elif item.is_dir():
                    result["directories"].append({
                        "name": item.name,
                        "path": str(item.absolute())
                    })
            
            return result
        except Exception as e:
            return {"error": f"Directory scan failed: {str(e)}"}